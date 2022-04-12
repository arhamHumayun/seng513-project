import User from "./user.js";

export default class playerStat {
   public user: User;
   public completionTimeSeconds: number;
   public cpm: Array<number>;
   public correct: number;
   public incorrect: number;
   public totalCodeLines: number;
   public completedCodeLines: number;
   public progress: number;

   constructor(user: User, completionTime: number, currentPosition: number, cpm: number, correct: number, incorrect: number, totalCodeLines: number) {
      this.user = user;
      this.completionTimeSeconds = completionTime;
      this.cpm = new Array<number>();
      this.cpm.push(cpm);
      this.correct = correct;
      this.incorrect = incorrect;
      this.totalCodeLines = totalCodeLines;
      this.completedCodeLines = 0;
      this.progress = 0;
   }
}