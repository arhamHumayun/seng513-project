
export interface IUserResponse {
  username: string;
  password: string;
}

export interface IUser {
  id: string;
  name: string;
  password: string
}

export interface ILobbyResponse {
  code: string,
  gameCode: IGameCode,
  gameRunning: boolean,
  gameStart: string,
  host: IUser,
  isPrivate: boolean,
  lastActivity: string,
  playerStats: string[],
  players: IUser[],
  statsPushed: boolean
}

export interface IGameCode {
  _id: string,
  language: string,
  code: string
}