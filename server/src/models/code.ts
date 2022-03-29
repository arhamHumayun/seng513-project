import { ObjectId } from "mongodb";

export default class Code {
   constructor(
      public language: string, 
      public code: string,
      public id?: ObjectId,
   ) {}
}