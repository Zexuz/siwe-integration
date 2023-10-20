import { SiweMessage } from "siwe";
import { create, findById } from "../userService";
import { createTokenWithUserId } from "../../utils/jwtHelper";

export enum SignInError {
  SignatureError = "Error verifying signature",
}

type SignInResult = {
  success: boolean;
  errorCode: SignInError | null;
  error: Error | null;
  token: string | null;
};

export const signIn = async (
  message: string,
  signature: string,
): Promise<SignInResult> => {
  const siweMessage = new SiweMessage(message);
  const { success, error, data } = await siweMessage.verify(
    { signature },
    { suppressExceptions: true },
  );

  if (!success) {
    return {
      success: false,
      errorCode: SignInError.SignatureError,
      error: new Error("Error verifying signature", { cause: error }),
      token: null,
    };
  }

  const user = await findById(data.address);
  if (!user) {
    await create(data.address);
  }

  return {
    success: true,
    errorCode: null,
    error: null,
    token: createTokenWithUserId(data.address),
  };
};
