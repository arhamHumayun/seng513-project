import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import Lobby from "src/models/lobby";
import User from "src/models/user";
import { collections } from "../services/database.service";
import { codeRouter } from "./code.router";

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
                generateNextCode();
                let lobby = new Lobby(nextCode,user);
                activeLobbies.push(lobby);
                resp.send(nextCode);
            }
        }else if(type == 'private'){
            let privateCode = 'P' + user.name;
            let lobby = new Lobby(privateCode, user, true);
            activeLobbies.push(lobby);
            resp.send(privateCode);

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
        let filteredLobbies = activeLobbies.filter(x => x.code === code);
        if(filteredLobbies.length == 0){
            resp.status(400).send("Lobby not found.")
        }else{
            let lobby = filteredLobbies[0];
            // if found, push player to lobby list
            lobby.players.push(user);
            updateLobbyTimestamp(lobby);
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
            resp.status(400).send("Not connected to that lobby.")
        }else{
            
            let lobby = filteredLobbies[0];
            // if found, check whether host or player
            // if host, 

        }
    }catch(e){
        resp.status(500).send("Unable to join lobby.");
    }
});

lobbyRouter.get("/getLobby/:id", async (req: Request, resp: Response) => {
    const code = req?.params?.code;
    const id = req?.params?.id;

    try{
        const query = { _id: new ObjectId(id) };
        const user = (await collections.users?.findOne(query)) as unknown as User;

        // filter lobbies by code
        let filteredLobbies = activeLobbies.filter(x => x.host == user || x.players.find(y => y.id == user.id));
        if(filteredLobbies.length == 0){
            resp.status(400).send('User not in a lobby.');
        }else{
            resp.status(200).send(filteredLobbies[0]);
        }

    }catch(e){
        resp.status(500).send("Error checking if user is in a lobby.");
    }
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

function removeOldLobbies(){
    console.log("Removing old lobbies...");
    let removaltime = new Date();
    removaltime.setSeconds(removaltime.getSeconds() - lobby_timeout_seconds);
    activeLobbies = activeLobbies.filter(x => x.lastActivity >= removaltime);
}

function updateLobbyTimestamp(lobby: Lobby){
    lobby.lastActivity = new Date();
}

/* Template

lobbyRouter.get("/new", async (req: Request, resp: Response) => {
    try{

    }catch(e){
        resp.status(500).send("Unable to create new lobby.");
    }
});

*/