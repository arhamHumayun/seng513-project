import axios from "axios";
import { } from "../interfaces/types";
axios.defaults.baseURL = "http://localhost:3001"
// import { ObjectId } from "mongodb";

export async function getLobbyData(id: string) {
  try {
    const response = await axios.get(`/lobby/getLobby/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Could not get lobby data");
  }
}