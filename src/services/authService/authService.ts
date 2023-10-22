import { generateNonce, SiweMessage } from "siwe";
import {
  create,
  findById,
  deleteLoginNonceForUser,
  getLoginNonceForUser,
  setLoginNonceForUser,
} from "../userService";
import { createTokenWithUserId } from "../../utils/jwtHelper";
import { DOMAIN } from "../../config/env";

export enum SignInError {
  SignatureError = "Error verifying signature",
  NonceError = "No nonce found for user",
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
  userProvidedAddress: string,
): Promise<SignInResult> => {
  const siweMessage = new SiweMessage(message);
  const expectedNonce = await getLoginNonceForUser(userProvidedAddress);

  if (!expectedNonce) {
    return {
      success: false,
      errorCode: SignInError.NonceError,
      error: new Error("No nonce found for user"),
      token: null,
    };
  }

  const { success, error, data } = await siweMessage.verify(
    { signature, nonce: expectedNonce, domain: DOMAIN },
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

  // Delete the nonce after it has been used, preventing replay attacks
  await deleteLoginNonceForUser(data.address);

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

export const getNonce = async (address: string): Promise<string> => {
  const nonce = generateNonce();
  await setLoginNonceForUser(address as string, nonce);

  return nonce;
};
