import axios from "axios";
import { BACKEND_URL } from "../config";

export async function getCourses() {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/v1/course/`);
    return response;
  } catch (error: any) {
    throw new Error(error.response.message);
  }
}
