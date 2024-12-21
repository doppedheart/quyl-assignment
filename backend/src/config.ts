import * as dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || "3000";

export const MONGO_URL = process.env.MONGO_URL || "";

export const JWT_SECRET = process.env.JWT_SECRET || "";

export const JWT_EXPIRE = process.env.JWT_EXPIRE || "1d";
