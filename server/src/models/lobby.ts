import User from "./user.js";
import playerStat from "./playerStat.js";

export default class Lobby {
   public code: string;
   public host: User;
   public players: Array<User>;
   public playerStats: Array<playerStat>;
   public lastActivity: Date;
   public isPrivate: boolean;
   public gameRunning: boolean

   constructor(code: string, host: User, isPrivate: boolean = false) {
      this.code = code;
      this.host = host;
      this.players = new Array<User>();
      this.playerStats = new Array<playerStat>();
      this.lastActivity = new Date();
      this.isPrivate = isPrivate;
      this.gameRunning = false;
      this.players.push(host);
   }
}