import express from "express";
import { User } from "../models/userModel";

export const me = async (req: express.Request, res: express.Response) => {
  const userId = req.getUserIdOrFail();
  const user = await User.findById({ _id: userId });
  if (!user) {
    res.status(404).send({ message: "User not found" });
    return;
  }

  res.json({ id: userId, username: user.username, bio: user.bio });
};

export const updateMe = async (req: express.Request, res: express.Response) => {
  const userId = req.getUserIdOrFail();
  const user = await User.findById({ _id: userId });
  if (!user) {
    res.status(404).send({ message: "User not found" });
    return;
  }

  const { username, bio } = req.body;
  if (username) {
    user.username = username;
  }
  if (bio) {
    user.bio = bio;
  }
  await user.save();

  res.json({
    id: userId,
    username: user.username,
    bio: user.bio,
  });
};
