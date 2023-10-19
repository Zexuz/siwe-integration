import { Request, Response } from "express";
import { generateNonce, SiweMessage } from "siwe";

export const signIn = async (req: Request, res: Response) => {
  const { message, signature } = req.body;
  const siweMessage = new SiweMessage(message);
  try {
    await siweMessage.verify({ signature });
    res.send(true); //TODO: create JWT and send it back
  } catch {
    res.send(false);
  }
};
