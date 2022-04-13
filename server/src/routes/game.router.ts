import express, { Request, Response } from "express";
import Code from "../models/code.js";
import Lobby from "../models/lobby.js";
import GameStat from "../models/gameStat.js"
import User from "../models/user.js";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service.js";
import { lobbyService } from "../services/lobby.service.js"
import playerStat from "../models/playerStat.js";

export const gameRouter = express.Router();

gameRouter.use(express.json());

gameRouter.get("/", async (req: Request, resp: Response) => {
    resp.status(400).send("Bad Game Page Request.");
});

gameRouter.post("/start/:id/:code/:codeId", async (req: Request, resp: Response) => {
    const roomCode = req?.params?.code;
    const id = req?.params?.id;
    const codeId = req?.params?.codeId;

    try{
        const userquery = { _id: new ObjectId(id) };
        const user = (await collections.users?.findOne(userquery)) as unknown as User;

        const codequery = { _id: new ObjectId(codeId) };
        const code = (await collections.code?.findOne(codequery)) as unknown as Code;
            
        let currentLobby = lobbyService.getLobby(roomCode);
        if(currentLobby === undefined){
            resp.status(400).send("Lobby not active.")
        }else{
            if(currentLobby.host.name != user.name){
                resp.status(400).send("User is not host.");
            }else if(currentLobby.gameRunning){
                resp.status(400).send("Game is already running!");
            }else{
                currentLobby.gameStart = new Date();
                currentLobby.gameRunning = true;
                currentLobby.statsPushed = false;
                let newStatArr = new Array<playerStat>();
                currentLobby.gameCode = code;
                const totalLines = currentLobby.gameCode.code.trim().split("\n").length  // trim takes care of newlines at the end
                currentLobby.players.forEach(player => {
                    let newStats = new playerStat(player, secondsFromStart(currentLobby!), 1, 0, 0, 0, totalLines);
                    newStatArr.push(newStats);
                });
                currentLobby.playerStats = newStatArr;
                lobbyService.updateLobby(currentLobby);
                resp.status(200).send(currentLobby);
            }
        }
    }catch(e){
        resp.status(500).send("Game start server error.");
    }
});

gameRouter.post("/updatePlayerState/:id/:code/:cpm/:correct/:incorrect", async (req: Request, resp: Response) => {
    const code = req?.params?.code;
    const id = req?.params?.id;
    const cpm = parseInt(req?.params?.cpm);
    const correct = parseInt(req?.params?.correct);
    const incorrect = parseInt(req?.params?.incorrect);
    
    let currentLobby = lobbyService.getLobby(code);
    if(currentLobby === undefined){
        return resp.status(400).send("Lobby not active.")
    }

    const query = { _id: new ObjectId(id) };
    const user = (await collections.users?.findOne(query)) as unknown as User;

    try{
        const currStat = currentLobby.playerStats.filter(x => x.user.name == user.name);
        
        if(currStat[0].completedCodeLines >= currStat[0].totalCodeLines){
            resp.status(400).send("User is already done their snippet.");
        }else{
            currStat[0].cpm.push(cpm);
            currStat[0].completedCodeLines++;
            currStat[0].completionTimeSeconds = secondsFromStart(currentLobby);
            currStat[0].correct += correct;
            currStat[0].incorrect += incorrect;
            currStat[0].progress = (currStat[0].completedCodeLines / currStat[0].totalCodeLines) * 100;
            let allDone = checkAllPlayersDone(currentLobby);
            if(allDone){
                console.log("GAME COMPLETE");
                currentLobby.gameRunning = false;
            }
            lobbyService.updateLobby(currentLobby);
            resp.status(200).send(lobbyService.getLobby(code));
        }
    }catch(e){
        resp.status(500).send("player state update server error.");
        }
});

// This is the endpoint to be called when the client continuously pings the server
gameRouter.get("/playerStats/:code", async (req: Request, resp: Response) => {
    const lobbyCode = req?.params?.code;
    const currentLobby = lobbyService.getLobby(lobbyCode);
    const results = [];

    if(currentLobby === undefined){
        resp.status(400).send("Lobby not active.");
    }else{
        for (let i = 0; i < currentLobby.playerStats.length; i++) {
            results.push({
                player_name: currentLobby.playerStats[i].user.name,
                progress: currentLobby.playerStats[i].progress,
                current_cpm: currentLobby.playerStats[i].cpm.reduce((prev, curr) => prev + curr, 0) / (currentLobby.playerStats[i].cpm.length - 1)
            })
        }
        resp.status(200).send(results);
    }
});

gameRouter.get("/isRunning/:code", async (req: Request, resp: Response) => {
    const lobbyCode = req?.params?.code;
    const currentLobby = lobbyService.getLobby(lobbyCode);

    if(currentLobby === undefined){
        resp.status(400).send(false);
    }else{
        resp.status(200).send(currentLobby.gameRunning);
    }
});

// This is the endpoint to be called when the client pings for the scoreboard
gameRouter.get("/scoreboard/:code", async (req: Request, resp: Response) => {
    const lobbyCode = req?.params?.code;
    const currentLobby = lobbyService.getLobby(lobbyCode);
    const results = [];

    if(currentLobby === undefined){
        resp.status(400).send("Lobby not active.");
    }else if(currentLobby.gameRunning){
        resp.status(400).send("Game still running.");
    }else{
        let sortedPlayers = currentLobby.playerStats.sort((a, b) => {return a.completionTimeSeconds - b.completionTimeSeconds})
        for (let i = 0; i < currentLobby.playerStats.length; i++) {
            let username = currentLobby.playerStats[i].user.name;
            results.push({
                player_name: username,
                position: sortedPlayers.findIndex(x => x.user.name == username) + 1,
                current_cpm: currentLobby.playerStats[i].cpm.reduce((prev, curr) => prev + curr, 0) / (currentLobby.playerStats[i].cpm.length - 1)
            });
    
            // checks in case scoreboard is called multiple times per user
            if(currentLobby.statsPushed == false){
                let statList = Array<GameStat>();
                const currentDate = new Date();
                currentLobby.playerStats.forEach(stat => {
                    const gameStat = new GameStat( 
                        stat.user.id!,
                        stat.cpm.reduce((prev, curr) => prev + curr, 0) / stat.cpm.length,
                        stat.correct, 
                        stat.incorrect,
                        currentDate);
                    statList.push(gameStat);
                });

                const dbResult = await collections.gameStats?.insertMany(statList);
                console.log(dbResult);

                currentLobby.statsPushed = true;
                lobbyService.updateLobby(currentLobby);
            }


        }
        resp.status(200).send(results);
    }
});

function secondsFromStart(lobby: Lobby){
    let now = new Date();
    return (now.getTime() - lobby.gameStart.getTime()) / 1000; // .getTime() returns milliseconds
}

function checkAllPlayersDone(lobby: Lobby){
    const totalLines = lobby.playerStats[0].totalCodeLines;
    let notDone = lobby.playerStats.filter(x => x.completedCodeLines < totalLines);
    //console.log("Players not done:")
    //console.dir(notDone.length);
    if(notDone.length > 0){
        return false;
    }else{
        return true;
    }
}

/* Template

gameRouter.get("/new", async (req: Request, resp: Response) => {
    try{

    }catch(e){
        resp.status(500).send("Unable to create new lobby.");
    }
});

*/