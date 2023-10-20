import express from "express";
import { findById, update } from "../services/userService";

export const meHandler = async (
  req: express.Request,
  res: express.Response,
) => {
  const userId = req.getUserIdOrFail();
  const user = await findById(userId);
  if (!user) {
    res.status(404);
    res.json({ message: "User not found" });
    return;
  }

  res.json({ id: userId, username: user.username, bio: user.bio });
};

export const updateMeHandler = async (
  req: express.Request,
  res: express.Response,
) => {
  const userId = req.getUserIdOrFail();
  const { username, bio } = req.body;

  const success = await update(userId, username, bio);
  if (!success) {
    res.status(404);
    res.json({ message: "User not found" });
    return;
  }

  res.json({
    id: userId,
    username: username,
    bio: bio,
  });
};
