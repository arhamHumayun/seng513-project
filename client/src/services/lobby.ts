import axios from "axios";
import { ILobbyResponse, IGameCode, IScoreboard } from "../interfaces/types";
axios.defaults.baseURL = "https://seng513-project.herokuapp.com/"

export async function getLobbyData(id: string) {
  try {
    const response = await axios.get<ILobbyResponse>(`/lobby/getLobby/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Could not get lobby data");
  }
}

export async function getCodeSnippet() {
  try {
    const response = await axios.get<IGameCode>('/code/random/');
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Could not get code snippet");
  }
}

export async function startGameService(id: string, lobbyCode: string, codeSnippetId: string) {
  try {
    const response = await axios.post<ILobbyResponse>(`/game/start/${id}/${lobbyCode}/${codeSnippetId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Could not start game");
  }
}

export async function updatePlayerState(id: string, lobbyCode: string, cpm: number, correct: number, incorrect: number) {
  try {
    const response = await axios.post<ILobbyResponse>(`/game/updatePlayerState/${id}/${lobbyCode}/${cpm}/${correct}/${incorrect}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Could not update player state");
  }
}

export async function getScoreboard(lobbyCode: string) {
  try {
    const response = await axios.get<IScoreboard[]>(`/game/scoreboard/${lobbyCode}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Could not get scoreboard");
  }
}

export function writeScoreboard(scoreboard : IScoreboard[]) {
  let scoreboard_str = " Rank\t\tPlayer Name         CPM\n----------------------------------------\n";
  let player = "";
  for (let i = 0; i < scoreboard.length; i++) {
    let name = scoreboard[i].player_name;
    player = ` #${scoreboard[i].position}\t\t${name}` //${Math.round(scoreboard[i].current_cpm)}\n`;
    for (let i = 0; i < (20 - name.length); i++) {
      player = player.concat(' ');
    }
    player = player.concat(`${Math.round(scoreboard[i].current_cpm)}\n`);
    scoreboard_str = scoreboard_str.concat(player);
  }
  return scoreboard_str;
}