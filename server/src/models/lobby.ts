import User from "./user.js";
import Code from "./code.js";
import playerStat from "./playerStat.js";

export default class Lobby {
   public code: string;
   public host: User;
   public players: Array<User>;
   public playerStats: Array<playerStat>;
   public lastActivity: Date;
   public isPrivate: boolean;
   public gameRunning: boolean;
   public gameCode: Code;
   public gameStart: Date;
   public statsPushed: boolean;

   constructor(code: string, host: User, isPrivate: boolean = false) {
      this.code = code;
      this.host = host;
      this.players = new Array<User>();
      this.playerStats = new Array<playerStat>();
      this.lastActivity = new Date();
      this.isPrivate = isPrivate;
      this.gameRunning = false;
      this.players.push(host);
      this.gameCode = new Code("","");
      this.gameStart = new Date("1900");
      this.statsPushed = false;
   }
}