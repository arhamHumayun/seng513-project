import express, { Request, Response } from "express";
import Code from "../models/code.js";

export const gameRouter = express.Router();

var gameCode: Code = new Code("","");

gameRouter.use(express.json());

gameRouter.get("/", async (req: Request, resp: Response) => {
    resp.status(400).send("Bad Game Page Request.");
});

gameRouter.post("setsnippet/:userid", async (req: Request, resp: Response) =>{
    //TODO
});

gameRouter.get("status/:code", async (req: Request, resp: Response) => {
    const code = req?.params?.code;
    //TODO
});

gameRouter.get("doneLine/:userid", async (req: Request, resp: Response) =>{
    //TODO
});


/* Template

gameRouter.get("/new", async (req: Request, resp: Response) => {
    try{

    }catch(e){
        resp.status(500).send("Unable to create new lobby.");
    }
});

*/