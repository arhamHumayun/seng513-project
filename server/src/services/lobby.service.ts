import Lobby from "../models/lobby.js";
import User from "../models/user.js";

const lobby_timeout_seconds = 15 * 60;
const lobby_remover_interval_milliseconds = 15 * 1000

//var activityChecker = setInterval(removeOldLobbies, lobby_remover_interval_milliseconds);

export class lobbyService{
    static activeLobbies = new Array<Lobby>();
    static debug = true;

    static getLobbies(){
        return this.activeLobbies;
    }

    static removeOldLobbies(){
        if(this.debug){
            console.log("Removing expired lobbies.");
        }
        let removaltime = new Date();
        removaltime.setSeconds(removaltime.getSeconds() - lobby_timeout_seconds);
        this.activeLobbies = this.activeLobbies.filter(x => x.lastActivity >= removaltime);
    }
    
    static printLobbyList(){
        if(this.debug){
            console.dir(this.activeLobbies, {depth: null})
        }
    }
    
    static getLobby(code: string){
        return this.activeLobbies.filter( x => x.code == code);
    }
    
    static addLobby(lobby: Lobby){
        this.activeLobbies.push(lobby)
        this.printLobbyList();
    }
    
    static removeLobby(code: string){
        this.activeLobbies = this.activeLobbies.filter(x => x.code != code)
        this.printLobbyList();
    }
    
    static updateLobby(lobby: Lobby){
        this.activeLobbies = this.activeLobbies.filter(x => x.code != lobby.code);
        this.addLobby(lobby)
        this.updateLobbyTimestamp(lobby.code);
        this.printLobbyList();
    }
    
    static updateLobbyTimestamp(code: string){
        this.activeLobbies.forEach(x  => {
            if(x.code == code){
                x.lastActivity = new Date();
            }
        });
        this.printLobbyList();
    }
    
    static leaveLobbies(user: User){
        // remove any lobbies the user is host of
        this.activeLobbies = this.activeLobbies.filter(x => x.host.name != user.name);
        this.activeLobbies.forEach( x => x.players = x.players.filter(y => y.name != user.name));
        this.printLobbyList();
    }
}