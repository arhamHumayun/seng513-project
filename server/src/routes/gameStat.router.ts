import { ObjectId } from "mongodb";
import express, { Request, Response } from "express";
import { collections } from "../services/database.service";
import GameStat from "src/models/gameStat";
import User from "src/models/user";

export const gameStatRouter = express.Router();

gameStatRouter.use(express.json());

gameStatRouter.get("/", async (_req: Request, res: Response) => {
   try {
      const gameStats = (await collections.gameStats?.find({}).toArray()) as unknown as GameStat[];
      res.status(200).send(gameStats);
   } catch (e: unknown) {
      if (e instanceof Error) {
         res.status(500).send(e.message);
      }
   }
});

gameStatRouter.get("/id/:id", async (req: Request, res: Response) => {
   const id = req?.params?.id;

   try {
      const query = { _id: new ObjectId(id) };
      const gameStat = (await collections.gameStats?.findOne(query)) as unknown as GameStat;

      if (gameStat) {
         res.status(200).send(gameStat);
      }
   } catch (e) {
      res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
   }
});

gameStatRouter.post("/", async (req:Request, res: Response) => {
   try {
      const newGameStat = req.body as GameStat;
      newGameStat.userId = new ObjectId(newGameStat.userId);
      newGameStat.date = new Date();
      const result = await collections.gameStats?.insertOne(newGameStat);

      result
         ? res.status(201).send(`Successfully created a new gameStat document with id ${result.insertedId}`)
         : res.status(500).send("Failed to create a new gameStat document.");
  } catch (e: unknown) {
      console.error(e);
      if (e instanceof Error) {
         res.status(400).send(e.message);
      }
  }
})

gameStatRouter.get("/user/:id", async (req: Request, res: Response) => {
   const id = req?.params?.id;

   try {
      const query = { userId: new ObjectId(id) };
      const gameStats = (await collections.gameStats?.find(query).toArray()) as unknown as GameStat[];
      res.status(200).send(gameStats);
   } catch (e: unknown) {
      if (e instanceof Error) {
         res.status(500).send(e.message);
      }
   }
});

gameStatRouter.get("/average/user/:id", async (req: Request, res: Response) => {
   const id = req?.params?.id;

   try {
      const query = { userId: new ObjectId(id) };
      const gameStats = (await collections.gameStats?.find(query).toArray()) as unknown as GameStat[];

      const result = {
         averageCpm: 0,
         averageCorrectKeystrokes: 0,
         averageIncorrectKeystrokes: 0
      }
      for (let i = 0; i < gameStats.length; i++) {
         result.averageCpm += gameStats[i].cpm;
         result.averageCorrectKeystrokes += gameStats[i].correct_keystrokes;
         result.averageIncorrectKeystrokes += gameStats[i].incorrect_keystrokes;
      }
      result.averageCpm /= gameStats.length;
      result.averageCorrectKeystrokes /= gameStats.length;
      result.averageIncorrectKeystrokes /= gameStats.length;

      res.status(200).send(result);
   } catch (e: unknown) {
      if (e instanceof Error) {
         res.status(500).send(e.message);
      }
   }
});