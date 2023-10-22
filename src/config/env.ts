import dotenv from "dotenv";
import { getEnvOrDefault, getEnvOrThrow } from "../utils/env";

dotenv.config();

const APP_PREFIX = "SIWE_";

const createEnvVarName = (name: string) => `${APP_PREFIX}${name}`;

export const PORT = getEnvOrDefault(createEnvVarName("PORT"), 3000);
export const MONGODB_URI = getEnvOrThrow(createEnvVarName("MONGODB_URI"));
export const JWT_SECRET = getEnvOrThrow(createEnvVarName("JWT_SECRET"));

export const DOMAIN = getEnvOrThrow(createEnvVarName("DOMAIN"));
