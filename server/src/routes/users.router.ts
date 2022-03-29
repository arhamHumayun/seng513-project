import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service.js";
import User from "../models/user";

export const userRouter = express.Router();

userRouter.use(express.json());

userRouter.get("/", async (_req: Request, res: Response) => {
   try {
      const users = (await collections.users!.find({}).toArray()) as unknown as User[];
      res.status(200).send(users);
   } catch (e: unknown) {
      if (e instanceof Error) {
         res.status(500).send(e.message);
      }
   }
});

userRouter.get("/:id", async (req: Request, res: Response) => {
   const id = req?.params?.id;

   try {
       const query = { _id: new ObjectId(id) };
       const user = (await collections.users!.findOne(query)) as unknown as User;

       if (user) {
           res.status(200).send(user);
       }
   } catch (error) {
       res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
   }
});