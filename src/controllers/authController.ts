import { Request, Response } from "express";
import { signIn, SignInError } from "../services/authService";

export const signInHandler = async (req: Request, res: Response) => {
  const { message, signature } = req.body;
  const { success, error, errorCode, token } = await signIn(message, signature);

  if (!success) {
    //TODO: Better error handling and logging, maybe use a middleware for non 200 responses
    console.error(`Error signing in: ${error}`);
    switch (errorCode) {
      case SignInError.SignatureError:
        res.status(401);
        res.json({});
        return;
      default:
        res.status(500);
        res.json({});
        return;
    }
  }

  res.json({ token });
};
