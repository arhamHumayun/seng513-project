import express, { Request, Response } from "express";
import Code from "../models/code.js";
import { lobbyService } from "../services/lobby.service.js"

export const gameRouter = express.Router();

var gameCode: Code = new Code("","");

gameRouter.use(express.json());

gameRouter.get("/", async (req: Request, resp: Response) => {
    resp.status(400).send("Bad Game Page Request.");
});

gameRouter.post("lineComplete/:userid/:lobbyId", async (req: Request, resp: Response) =>{
    //TODO
});

gameRouter.get("onSubmit/:code", async (req: Request, resp: Response) => {
    const code = req?.params?.code;
    //TODO
});

gameRouter.get("test", async (req: Request, resp: Response) =>{
    resp.status(200).send(lobbyService.getLobbies());
});


/* Template

gameRouter.get("/new", async (req: Request, resp: Response) => {
    try{

    }catch(e){
        resp.status(500).send("Unable to create new lobby.");
    }
});

*/