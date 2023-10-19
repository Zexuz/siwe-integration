import { Request, Response } from "express";
import { SiweMessage } from "siwe";
import { signToken } from "../utils/jwtHelper";

export const signIn = async (req: Request, res: Response) => {
  const { message, signature } = req.body;
  const siweMessage = new SiweMessage(message);
  try {
    const verificationRes = await siweMessage.verify({ signature });

    if (!verificationRes.success) {
      console.error(`Error verifying signature: ${verificationRes.error}`);
      res.send(false);
      return;
    }

    const token = signToken({
      address: verificationRes.data.address,
    });
    res.send({ token: token });
  } catch (e: any) {
    console.error(`Error verifying signature: ${e}`);
    res.send(false);
  }
};
