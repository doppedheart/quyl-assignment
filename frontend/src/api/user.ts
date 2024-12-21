import axios from "axios";
import { BACKEND_URL } from "../config";

export async function submitSignup(data: any) {
  try {
    const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, {
      ...data,
    });
    return response;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function submitLogin(data: any) {
  try {
    const response = await axios.post(`${BACKEND_URL}/api/v1/user/login`, {
      ...data,
    });
    return response;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}

export async function checkAuth() {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/v1/user/check`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    return response;
  } catch (error: any) {
    throw new Error(error.message.data.message);
  }
}
