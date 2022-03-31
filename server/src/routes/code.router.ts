import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import Code from "../models/code";

export const codeRouter = express.Router();

codeRouter.use(express.json());

codeRouter.get("/", async (_req: Request, res: Response) => {
   try {
      const code = (await collections.code?.find({}).toArray()) as unknown as Code[];
      res.status(200).send(code);
   } catch (e: unknown) {
      if (e instanceof Error) {
         res.status(500).send(e.message);
      }
   }
});

codeRouter.get("/id/:id", async (req: Request, res: Response) => {
   const id = req?.params?.id;

   try {
      const query = { _id: new ObjectId(id) };
      const code = (await collections.code?.findOne(query)) as unknown as Code;

      if (code) {
         res.status(200).send(code);
      }
   } catch (e) {
      res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
   }
});

codeRouter.get("/random/", async (req: Request, res: Response) => {
   try {
      const code = (await collections.code?.find({}).toArray()) as unknown as Code[];
      res.status(200).send(code[Math.floor(Math.random()*code.length)]);
   } catch (e: unknown) {
      if (e instanceof Error) {
         res.status(500).send(e.message);
      }
   }
});

codeRouter.post("/",async (req:Request, res: Response) => {
   try {
      const newCode = req.body as Code;
      const result = await collections.code?.insertOne(newCode);

      result
         ? res.status(201).send(`Successfully created a new code document with id ${result.insertedId}`)
         : res.status(500).send("Failed to create a new code document.");
  } catch (e: unknown) {
      console.error(e);
      if (e instanceof Error) {
         res.status(400).send(e.message);
      }
  }
})
