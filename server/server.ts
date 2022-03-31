import express from 'express'
import { codeRouter } from './src/routes/code.router.js';
import { userRouter } from './src/routes/users.router.js';
import { connectToDatabase } from "./src/services/database.service.js"

const app = express()
const port = 3001

connectToDatabase()
   .then(() => {
      app.use("/user", userRouter);
      app.use("/code", codeRouter)

      app.listen(port, () => {
         console.log(`Server started at http://localhost:${port}`);
      });
   })
   .catch((error: Error) => {
      console.error("Database connection failed", error);
      process.exit();
   });