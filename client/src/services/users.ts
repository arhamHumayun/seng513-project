import axios from "axios";
import { IUserResponse } from "../interfaces/types";
axios.defaults.baseURL = "http://localhost:3001"

export async function createUser(name: string, password: string) {
  try {
    const response = await axios.post<IUserResponse>('/user/signup', {
      name,
      password
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Could not create user");
  }
}

export async function loginUser(name: string, password: string) {
  try {
    const response = await axios.post<IUserResponse>('/user/login', {
      name,
      password
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Could not login user");
  }
}

// WHY DOESNT THIS WORK
const user = localStorage.getItem("user"); // get user from browser storage
let userObj: { name: string; _id: string; } | null = null;
if (user != null)
  userObj = JSON.parse(user);
export default userObj;