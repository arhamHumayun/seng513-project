import axios from "axios";
import { ILobbyResponse, IGameCode } from "../interfaces/types";
axios.defaults.baseURL = "http://localhost:3001"
// import { ObjectId } from "mongodb";

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