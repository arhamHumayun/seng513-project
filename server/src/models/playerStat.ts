import { ObjectId } from "mongodb";
import User from "./user.js";

export default class playerStat {
   public user: User;
   public completionTimeSeconds: number;
   public currentPosition: number;
   public cpm: number;
   public correct: number;
   public incorrect: number;
   public totalCodeLines: number;
   public completedCodeLines: number;

   constructor(user: User, completionTime: number, currentPosition: number, cpm: number, correct: number, incorrect: number, totalCodeLines: number) {
      this.user = user;
      this.completionTimeSeconds = completionTime;
      this.currentPosition = currentPosition;
      this.cpm = cpm;
      this.correct = correct;
      this.incorrect = incorrect;
      this.totalCodeLines = totalCodeLines;
      this.completedCodeLines = 0;
   }
}