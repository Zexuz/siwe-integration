import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";

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
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, JWT_SECRET);
};
