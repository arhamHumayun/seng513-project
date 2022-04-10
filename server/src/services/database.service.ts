import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

export const collections: {
   users?: mongoDB.Collection 
   code?: mongoDB.Collection 
   gameStats?: mongoDB.Collection
} = {}

export async function connectToDatabase() {
   dotenv.config();

   const DB_CONN_STRING = process.env.DB_CONN_STRING as string;
   const USERS_COLLECTION_NAME = process.env.USERS_COLLECTION_NAME as string;
   const CODE_COLLECTION_NAME = process.env.CODE_COLLECTION_NAME as string;
   const GAMESTAT_COLLECTION_NAME = process.env.GAMESTAT_COLLECTION_NAME as string;

   const client: mongoDB.MongoClient = new mongoDB.MongoClient(DB_CONN_STRING);
           
   await client.connect();
       
   const db: mongoDB.Db = client.db(process.env.DB_NAME);

   const userCollection: mongoDB.Collection = db.collection(USERS_COLLECTION_NAME);
   collections.users = userCollection;

   const codeCollection: mongoDB.Collection = db.collection(CODE_COLLECTION_NAME);
   collections.code = codeCollection;

   const gameStatCollection: mongoDB.Collection = db.collection(GAMESTAT_COLLECTION_NAME);
   collections.gameStats = gameStatCollection;
      
   console.log(`Successfully connected to database: ${db.databaseName}`);
}