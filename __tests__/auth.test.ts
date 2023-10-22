import request from "supertest";
import dotenv from "dotenv";
import { setupTest, initApp, USER_ID } from "./helpers";
import { Wallet } from "ethers";
import { SiweMessage } from "siwe";

dotenv.config({ path: ".env.test" });

setupTest();
const app = initApp();

const signMessage = async (nonce: string) => {
  const wallet = Wallet.createRandom();

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

  return { message, signature };
};

describe("/api/auth/signin", () => {
  describe("POST", () => {
    it("should return 200 OK", async () => {
      const nonceRes = await request(app).get(
        "/api/auth/nonce?address=" + USER_ID,
      );

      const { message, signature } = await signMessage(nonceRes.body.nonce);
      const res = await request(app)
        .post("/api/auth/signin")
        .send({ message, signature, address: USER_ID });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("token");
      expect(res.body.token).toMatch(/(^[\w-]*\.[\w-]*\.[\w-]*$)/);
    });
  });
});
