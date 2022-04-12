import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import playerStat from "src/models/playerStat.js";
import Lobby from "../models/lobby.js";
import User from "../models/user.js";
import { collections } from "../services/database.service.js";
import { lobbyService } from "../services/lobby.service.js"
export const lobbyRouter = express.Router();

lobbyRouter.use(express.json());

var nextCode = 'ZZZZ';
var outOfLobbies = false;

lobbyRouter.get("/", async (req: Request, resp: Response) => {
    resp.status(400).send("Bad Request.");
});

lobbyRouter.get("/new/:type/:id", async (req: Request, resp: Response) => {
    const type = req?.params?.type;
    const id = req?.params?.id;
    try{
        const query = { _id: new ObjectId(id) };
        const user = (await collections.users?.findOne(query)) as unknown as User;
        let activeLobbies = lobbyService.getLobbies();
        if(type == 'public'){
            if(outOfLobbies){
                resp.status(503).send("Unable to create a new lobby, max lobbies created.");
            }else{
                lobbyService.leaveLobbies(user);
                generateNextCode();
                let lobby = new Lobby(nextCode,user);
                lobby.playerStats = new Array<playerStat>();
                lobby.playerStats.push(new playerStat(user,0,0,0,0,0,0));
                lobbyService.addLobby(lobby)
                resp.status(200).send(nextCode);
            }
        }else if(type == 'private'){
            lobbyService.leaveLobbies(user);
            let privateCode = 'P' + user.name;
            let lobby = new Lobby(privateCode, user, true);
            lobbyService.addLobby(lobby)
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
        let filteredLobby = lobbyService.getLobby(code)
        if(filteredLobby === undefined){
            resp.status(400).send("Lobby not found.")
        }else{
            lobbyService.leaveLobbies(user);
            // if found, push player to lobby list
            let newStat = new playerStat(user, 0,0,0,0,0,0)
            filteredLobby.players.push(user);
            filteredLobby.playerStats.push(newStat);
            lobbyService.updateLobby(filteredLobby);
            resp.status(200).send(filteredLobby);
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
        let filteredLobby = lobbyService.getLobby(code)
        if(filteredLobby === undefined){
            resp.status(400).send(false);
        }else{
            lobbyService.leaveLobbies(user);
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
        let filteredLobbies = lobbyService.getLobbies().filter(x => x.players.find(y => y.name == user.name));
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
    let activeLobbies = lobbyService.getLobbies();
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

/* Template

lobbyRouter.get("/new", async (req: Request, resp: Response) => {
    try{

    }catch(e){
        resp.status(500).send("Unable to create new lobby.");
    }
});

*/