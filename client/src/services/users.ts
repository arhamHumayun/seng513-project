import axios from "axios";
import { IUserResponse } from "../interfaces/types";
axios.defaults.baseURL = "http://localhost:3001"

export async function createUser(username: string, password: string) {
  try {
    const response = await axios.post<IUserResponse>('/user/signup', {
      username,
      password
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Could not create user");
  }
}

export async function loginUser(username: string, password: string) {
  try {
    const response = await axios.post<IUserResponse>('/user/login', {
      username,
      password
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Could not login user");
  }
}