import express from "express";
import { verifyToken } from "../utils/jwtHelper";

export const jwtAuth = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const authHeader = req.get("authorization");
  if (!authHeader) {
    res.status(401).json({ message: "Not authenticated" });
    return;
  }

  const token = authHeader.split(" ")[1];
  const verifiedToken = await verifyToken(token);

  if (!verifiedToken) {
    res.status(401).json({ message: "Not authenticated" });
    return;
  }

  if (typeof verifiedToken === "string") {
    req.userId = verifiedToken;
  }

  if (typeof verifiedToken === "object") {
    req.userId = verifiedToken.sub;
  }

  next();
};
