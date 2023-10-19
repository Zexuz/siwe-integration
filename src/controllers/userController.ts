import express from "express";

export const me = (req: express.Request, res: express.Response) => {
  const userId = req.userId;
  res.send({ userId: userId });
};
