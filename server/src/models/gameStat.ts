import { ObjectId } from "mongodb";

export default class GameStat {
   constructor(
      public userId: ObjectId,
      public cpm: number,
      public correct_keystrokes: number,
      public incorrect_keystrokes: number,
      public date: Date,
      public id?: ObjectId,
   ) {}
} 