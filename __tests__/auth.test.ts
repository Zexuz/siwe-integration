import request from "supertest";
import dotenv from "dotenv";
import { initApp } from "./helpers";
import { Wallet, HDNodeWallet } from "ethers";
import { SiweMessage } from "siwe";
import { startDb } from "../src/config/db";
import { User } from "../src/models/userModel";
import * as wasi from "wasi";

dotenv.config({ path: ".env.test" });

const app = initApp();
const wallet = Wallet.createRandom();
const USER_ID = wallet.address;

beforeAll(async () => {
  await startDb();

  const newUser = new User({
    _id: USER_ID,
    username: USER_ID,
    bio: "",
  });
  await newUser.save();
});

afterAll(async () => {
  await User.deleteMany({});
});

const signMessage = async (nonce: string, wallet: HDNodeWallet) => {
  function createSiweMessage(address: string, statement: string) {
    const expirationOffset = 1000 * 60 * 5;
    const currentTimestamp = Date.now();
    const expirationTime = new Date(currentTimestamp + expirationOffset);

    const domain = "localhost:5173";
    const origin = "http://localhost:3000";

    const message = new SiweMessage({
      domain,
      address,
      statement,
      uri: origin,
      version: "1",
      chainId: 1,
      expirationTime: expirationTime.toISOString(),
      nonce,
    });
    return message.prepareMessage();
  }

  const message = createSiweMessage(
    wallet.address,
    "Sign in with Ethereum to the app.",
  );
  const signature = await wallet.signMessage(message);

  return { message, signature, address: wallet.address };
};

describe("/api/auth/signin", () => {
  describe("POST", () => {
    it("should return 200 OK", async () => {
      const nonceRes = await request(app).get(
        "/api/auth/nonce?address=" + wallet.address,
      );

      const { message, signature } = await signMessage(
        nonceRes.body.nonce,
        wallet,
      );
      const res = await request(app)
        .post("/api/auth/signin")
        .send({ message, signature, address: wallet.address });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("token");
      expect(res.body.token).toMatch(/(^[\w-]*\.[\w-]*\.[\w-]*$)/);
    });
  });
});
