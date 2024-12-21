import jwt from "jsonwebtoken";
import { JWT_EXPIRE, JWT_SECRET } from "../config";

export async function createToken(id: string) {
  try {
    return await jwt.sign({ id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRE,
    });
  } catch (error: any) {
    console.log(error);
  }
}

export async function veriftyToken(token: string) {
  return await jwt.verify(token, JWT_SECRET);
}
