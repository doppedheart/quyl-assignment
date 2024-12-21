import axios from "axios";
import { BACKEND_URL } from "../config";
import { Student } from "@/types/Student.types";

export async function getStudents() {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/v1/student/`);
    return response;
  } catch (error: any) {
    throw new Error(error.response.message);
  }
}

export async function createStudent(data: Student) {
  try {
    const response = await axios.post(`${BACKEND_URL}/api/v1/student`, {
      ...data,
    });
    return response;
  } catch (error: any) {
    throw new Error(error.response.message);
  }
}

export async function updateStudent(data: Student, id: string) {
  try {
    const response = await axios.put(`${BACKEND_URL}/api/v1/student/${id}`, {
      ...data,
    });
    return response;
  } catch (error: any) {
    throw new Error(error.response.message);
  }
}
export async function enrollInCourse(studentId: string, courseId: string) {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/student/${studentId}/courses/${courseId}`
    );
    return response;
  } catch (error: any) {
    throw new Error(error.response.message);
  }
}
