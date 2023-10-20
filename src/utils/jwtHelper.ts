import jwt from "jsonwebtoken";
import { getEnvOrThrow } from "./env";

interface Claims {
  sub: string;
}

export const createTokenWithUserId = (userId: string): string => {
  const claims: Claims = {
    sub: userId,
  };

  return signToken(claims);
};

const signToken = (payload: object, expiresIn: string = "1h"): string => {
  return jwt.sign(payload, getJwtSecret(), { expiresIn });
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, getJwtSecret());
};

const getJwtSecret = () => {
  return getEnvOrThrow("JWT_SECRET");
};
