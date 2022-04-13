
export interface IUserResponse {
  username: string;
  password: string;
}

export interface IUser {
  id: string;
  name: string;
  password: string
}

export interface IPlayerStat {
  completedCodeLines: number,
  completionTimeSeconds: number,
  correct: number,
  cpm: number[],
  incorrect: number,
  progress: number,
  totalLines: number,
  user: IUser
}

export interface ILobbyResponse {
  code: string,
  gameCode: IGameCode,
  gameRunning: boolean,
  gameStart: string,
  host: IUser,
  isPrivate: boolean,
  lastActivity: string,
  playerStats: IPlayerStat[],
  players: IUser[],
  statsPushed: boolean
}

export interface IGameCode {
  _id: string,
  language: string,
  code: string
}