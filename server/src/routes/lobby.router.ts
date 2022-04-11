import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import Lobby from "../models/lobby.js";
import User from "../models/user.js";
import { collections } from "../services/database.service.js";

export const lobbyRouter = express.Router();

lobbyRouter.use(express.json());

const lobby_timeout_seconds = 15 * 60;
const lobby_remover_interval_milliseconds = 15 * 1000

var activityChecker = setInterval(removeOldLobbies, lobby_remover_interval_milliseconds);

var nextCode = 'ZZZZ';
var outOfLobbies = false;
var activeLobbies = new Array<Lobby>();

lobbyRouter.get("/", async (req: Request, resp: Response) => {
    resp.status(400).send("Bad Request.");
});

lobbyRouter.get("/new/:type/:id", async (req: Request, resp: Response) => {
    const type = req?.params?.type;
    const id = req?.params?.id;
    try{
        const query = { _id: new ObjectId(id) };
        const user = (await collections.users?.findOne(query)) as unknown as User;
        if(type == 'public'){
            if(outOfLobbies){
                resp.status(503).send("Unable to create a new lobby, max lobbies created.");
            }else{
                leaveLobbies(user);
                generateNextCode();
                let lobby = new Lobby(nextCode,user);
                activeLobbies.push(lobby);
                resp.status(200).send(nextCode);
            }
        }else if(type == 'private'){
            leaveLobbies(user);
            let privateCode = 'P' + user.name;
            let lobby = new Lobby(privateCode, user, true);
            activeLobbies.push(lobby);
            resp.status(200).send(privateCode);
        }else{
            resp.status(400).send("Invalid lobby type.");
        }
    }catch(e){
        resp.status(500).send("Unable to create new lobby.");
    }
});

lobbyRouter.get("/join/:id/:code", async (req: Request, resp: Response) => {
    const code = req?.params?.code;
    const id = req?.params?.id;
    try{
        const query = { _id: new ObjectId(id) };
        const user = (await collections.users?.findOne(query)) as unknown as User;
        // filter lobbies by code
        let filteredLobbies = activeLobbies.filter(x => x.code == code);
        if(filteredLobbies.length == 0){
            resp.status(400).send("Lobby not found.")
        }else{
            leaveLobbies(user);
            let lobby = filteredLobbies[0];
            // if found, push player to lobby list
            lobby.players.push(user);
            updateLobbyTimestamp(lobby);
            resp.status(200).send(lobby);
        }
    }catch(e){
        resp.status(500).send("Unable to join lobby.");
    }
});

lobbyRouter.get("/leave/:id/:code", async (req: Request, resp: Response) => {
    const code = req?.params?.code;
    const id = req?.params?.id;
    try{
        const query = { _id: new ObjectId(id) };
        const user = (await collections.users?.findOne(query)) as unknown as User;

        // filter lobbies by code
        let filteredLobbies = activeLobbies.filter(x => x.code === code);
        if(filteredLobbies.length == 0){
            resp.status(400).send(false);
        }else{
            
            let lobby = filteredLobbies[0];
            // if found, check whether host or player
            // if host, remove lobby
            if(lobby.host.id == user.id){
                activeLobbies = activeLobbies.filter(x => x.code != code);
                //console.log("Host left lobby.");
            }else{
                lobby.players = lobby.players.filter(x => x.id != user.id);
                //console.log("Player left lobby.");
            }
            resp.status(200).send(true);
        }
    }catch(e){
        resp.status(500).send(false);
    }
});

lobbyRouter.get("/getLobby/:id", async (req: Request, resp: Response) => {
    const code = req?.params?.code;
    const id = req?.params?.id;

    try{
        const query = { _id: new ObjectId(id) };
        const user = (await collections.users?.findOne(query)) as unknown as User;

        // filter lobbies by code
        let filteredLobbies = activeLobbies.filter(x => x.players.find(y => y.id == user.id));
        if(filteredLobbies.length == 0){
            resp.status(400).send('User not in a lobby.');
        }else{
            resp.status(200).send(filteredLobbies[0]);
        }

    }catch(e){
        resp.status(500).send("Error checking if user is in a lobby.");
    }
});

// This is the endpoint to be called when the client continuously pings the server
lobbyRouter.get("/playerStats/:code", async (req: Request, resp: Response) => {
    const lobbyCode = req?.params?.code;
    const currentLobby = findLobbyByCode(lobbyCode) as Lobby;
    const results = [];

    for (let i = 0; i < currentLobby.playerStats.length; i++) {
        results.push({
            player_name: currentLobby.playerStats[i].user.name,
            progress: currentLobby.playerStats[i].completionTimeSeconds / currentLobby.playerStats[i].completedCodeLines,
            current_cpm: currentLobby.playerStats[i].cpm,
        })
    }
    resp.status(200).send(results);
});

// This is the endpoint to be called when the client pings for the scoreboard
lobbyRouter.get("/scoreboard/:code", async (req: Request, resp: Response) => {
    const lobbyCode = req?.params?.code;
    const currentLobby = findLobbyByCode(lobbyCode) as Lobby;
    const results = [];

    for (let i = 0; i < currentLobby.playerStats.length; i++) {
        results.push({
            player_name: currentLobby.playerStats[i].user.name,
            position: currentLobby.playerStats[i].currentPosition,
            current_cpm: currentLobby.playerStats[i].cpm,
        })
    }
    resp.status(200).send(results);
});

function generateNextCode(){
    // check if there are any codes to generate
    if(activeLobbies.length >= (24^4)){
        outOfLobbies = true;
        return;
    }else{
        outOfLobbies = false;
    }

    while(true){
        // increment alphabetical code
        let iter = nextCode.length - 1;
        while(iter >= 0){
            let char = nextCode.charAt(iter);
            let newchar = '';
            let exit = false;
            if(char === 'Z'){
                newchar = 'A';
            }else{
                newchar = String.fromCharCode(char.charCodeAt(0) + 1);
                exit = true;
            }
            nextCode = nextCode.substring(0,iter) + newchar + nextCode.substring(iter+1);
            if(exit){
                break;
            }
            iter--;
        }
        // only exit loop once we find a lobby code not in active use
        if(activeLobbies.findIndex(x => x.code == nextCode) == -1){
            break;
        }
    }
}

function findLobbyByCode(code:string) {
    for (let i = 0; i < activeLobbies.length; i++) {
        if (activeLobbies[i].code == code) {
            return activeLobbies[i] as Lobby;
        }
    }
}

function removeOldLobbies(){
    let removaltime = new Date();
    removaltime.setSeconds(removaltime.getSeconds() - lobby_timeout_seconds);
    activeLobbies = activeLobbies.filter(x => x.lastActivity >= removaltime);
}

function updateLobbyTimestamp(lobby: Lobby){
    lobby.lastActivity = new Date();
}

function leaveLobbies(user: User){
    // remove any lobbies the user is host of
    activeLobbies = activeLobbies.filter(x => x.host.id != user.id);
    activeLobbies.forEach( x => x.players.filter(y => y.id != user.id));
    
}

/* Template

lobbyRouter.get("/new", async (req: Request, resp: Response) => {
    try{

    }catch(e){
        resp.status(500).send("Unable to create new lobby.");
    }
});

*/