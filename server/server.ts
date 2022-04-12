import express from 'express'
import { codeRouter } from './src/routes/code.router.js';
import { userRouter } from './src/routes/users.router.js';
import { lobbyRouter } from './src/routes/lobby.router.js'
import { connectToDatabase } from './src/services/database.service.js';
import { gameRouter } from './src/routes/game.router.js';
import { gameStatRouter } from './src/routes/gameStat.router.js';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3001;

// prevents CORS errors during requests
const corsOptions ={
   origin:'*', 
   credentials:true,          
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))

connectToDatabase()
   .then(() => {
      app.use("/user", userRouter);
      app.use("/code", codeRouter);
      app.use("/lobby", lobbyRouter);
      app.use("/game", gameRouter);
      app.use("/stats", gameStatRouter)

      app.listen(port, () => {
         console.log(`Server started at http://localhost:${port}`);
      });
   })
   .catch((error: Error) => {
      console.error("Database connection failed", error);
      process.exit();
   });