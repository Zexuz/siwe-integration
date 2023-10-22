import { Request, Response } from "express";
import { signIn, SignInError, getNonce } from "../services/authService";

export const signInHandler = async (req: Request, res: Response) => {
  const { message, signature, address: userProvidedAddress } = req.body;
  const { success, error, errorCode, token } = await signIn(
    message,
    signature,
    userProvidedAddress,
  );

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

export const nonceHandler = async (req: Request, res: Response) => {
  const { address } = req.query;

  const nonce = await getNonce(address as string);

  res.json({ nonce: nonce });
};
