import jwt from "jsonwebtoken";
import { getEnvOrThrow } from "./env";

export const signToken = (
  payload: object,
  expiresIn: string = "1h",
): string => {
  return jwt.sign(payload, getJwtSecret(), { expiresIn });
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, getJwtSecret());
};

const getJwtSecret = () => {
  return getEnvOrThrow("JWT_SECRET");
};
