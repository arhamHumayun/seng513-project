import { ObjectId } from "mongodb";
import User from "./user.js";

export default class playerStat {
   public user: User;
   public completionTime: number;
   public currentPosition: number;
   public cpm: number;
   public correct: number;
   public incorrect: number;

   constructor(user: User, completionTime: number, currentPosition: number, cpm: number, correct: number, incorrect: number) {
      this.user = user;
      this.completionTime = completionTime;
      this.currentPosition = currentPosition;
      this.cpm = cpm;
      this.correct = correct;
      this.incorrect = incorrect;
   }
}