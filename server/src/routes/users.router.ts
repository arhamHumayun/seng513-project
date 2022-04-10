import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service.js";
import User from "../models/user.js";
import bcrypt from 'bcrypt';

const saltOrRounds = 8;
export const userRouter = express.Router();

userRouter.use(express.json());

userRouter.get("/", async (_req: Request, res: Response) => {
   try {
      const users = (await collections.users?.find({}).toArray()) as unknown as User[];
      res.status(200).send(users);
   } catch (e: unknown) {
      if (e instanceof Error) {
         res.status(500).send(e.message);
      }
   }
});

userRouter.get("/id/:id", async (req: Request, res: Response) => {
   const id = req?.params?.id;

   try {
      const query = { _id: new ObjectId(id) };
      const user = (await collections.users?.findOne(query)) as unknown as User;

      if (user) {
         res.status(200).send(user);
      }
   } catch (error) {
      res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
   }
});

userRouter.post("/signup", async (req:Request, res: Response) => {
   try {
      const newUser = req.body as User;

      // Check preexisting usernames
      const allUsers = (await collections.users?.find({}).toArray()) as unknown as User[];
      for (let i = 0; i < allUsers.length; i++) {
         if (newUser.name == allUsers[i].name) {
            res.status(400).send("Username already taken.");
            return
         }
      }

      newUser.password = bcrypt.hashSync(newUser.password, saltOrRounds)
      const result = await collections.users?.insertOne(newUser);

      result
         ? res.status(201).send(`${result.insertedId}`)
         : res.status(500).send("Failed to create a new code document.");
   } catch (e: unknown) {
      console.error(e);
      if (e instanceof Error) {
         res.status(400).send(e.message);
      }
   }

})

userRouter.post("/login", async (req:Request, res: Response) => {
   try {
      const newUser = req.body as User;

      // Find username fisrt
      const query = {
         name: newUser.name,
      };
      const loggedInUser = (await collections.users?.findOne(query)) as unknown as User;
      if (!loggedInUser) {
         res.status(400).send("User not found.");
         return;
      }

      // Verify password
      const passwordIsValid = bcrypt.compareSync(
         newUser.password,
         loggedInUser.password
      );
      if (!passwordIsValid) {
         res.status(401).send("Invalid password.");
         return;
      }

      loggedInUser.password = '\0';
      res.status(200).send(loggedInUser);
      
   } catch (e: unknown) {
      console.error(e);
      if (e instanceof Error) {
         res.status(400).send(e.message);
      }
   }
})

userRouter.delete("/", async (req:Request, res: Response) => {
   try {
      const newUser = req.body as User;
      const query = {
         name: newUser.name,
      };
      const loggedInUser = (await collections.users?.findOne(query)) as unknown as User;
      if (!loggedInUser) {
         res.status(400).send("User not found.");
         return;
      }
      const passwordIsValid = bcrypt.compareSync(
         newUser.password,
         loggedInUser.password
      );
      if (!passwordIsValid) {
         res.status(401).send("Invalid password.");
         return;
      }
      const result = (await collections.users?.deleteOne(query));
      result
         ? res.status(201).send(`Deleted user.`)
         : res.status(500).send("Failed to delete user.");
      
   } catch (e: unknown) {
      console.error(e);
      if (e instanceof Error) {
         res.status(400).send(e.message);
      }
   }
})
