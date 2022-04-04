import { ObjectId } from "mongodb";

export default class User {
   constructor(
      public name: string, 
      public password: string,
      public id?: ObjectId,
   ) {}
}