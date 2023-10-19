import { Request, Response } from "express";
import { SiweMessage } from "siwe";
import { signToken } from "../utils/jwtHelper";
import { User } from "../models/userModel";

export const signIn = async (req: Request, res: Response) => {
  const { message, signature } = req.body;

  const siweMessage = new SiweMessage(message);
  const { success, error, data } = await siweMessage.verify(
    { signature },
    { suppressExceptions: true },
  );

  if (!success) {
    console.error(`Error verifying signature: ${error}`);
    res.status(401);
    res.send(false);
  }

  const claims = {
    sub: data.address,
  };

  const token = signToken(claims);

  const user = await User.findById({ _id: data.address });
  if (!user) {
    const newUser = new User({
      _id: data.address,
      username: data.address,
      bio: "",
    });
    await newUser.save();
  }

  res.send({ token: token });
};
