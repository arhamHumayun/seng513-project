import User from "./user";

export default class Lobby {
   public code: string;
   public host: User;
   public players: Array<User>;
   public lastActivity: Date;
   public isPrivate: boolean;

   constructor(code: string, host: User, isPrivate: boolean = false) {
      this.code = code;
      this.host = host;
      this.players = new Array<User>();
      this.lastActivity = new Date();
      this.isPrivate = isPrivate;
      this.players.push(host);
   }
}