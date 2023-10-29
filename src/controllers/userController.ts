import express from "express";
import { findById, update } from "../services/userService";
import { UpdateError } from "../services/userService/update";

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

  const { success, errorCode, error } = await update(userId, username, bio);
  if (!success) {
    switch (errorCode) {
      case UpdateError.UserNotFound:
        res.status(404);
        res.json({ message: "User not found" });
        return;
      case UpdateError.UsernameTaken:
        res.status(400);
        res.json({ message: "Username is already taken" });
        return;
      default:
        res.status(500);
        res.json({ message: "Something went wrong" });
        return;
    }
  }

  res.json({
    id: userId,
    username: username,
    bio: bio,
  });
};
