import request from "supertest";
import { User } from "../src/models/userModel";
import dotenv from "dotenv";
import { startDb } from "../src/config/db";
import { initApp } from "./helpers";

dotenv.config({ path: ".env.test" });

const app = initApp();

beforeAll(async () => {
  await startDb();

  const newUser = new User({
    _id: "0xddc2f17daCb8187AC0e26e6Bd852Ee3212684b81",
    username: "0xddc2f17daCb8187AC0e26e6Bd852Ee3212684b81",
    bio: "",
  });
  await newUser.save();
});

afterAll(async () => {
  await User.deleteMany({});
});

describe("/api/user/me", () => {
  describe("GET", () => {
    it("should return 200 OK", async () => {
      const res = await request(app).get("/api/user/me");

      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        bio: "",
        id: "0xddc2f17daCb8187AC0e26e6Bd852Ee3212684b81",
        username: "0xddc2f17daCb8187AC0e26e6Bd852Ee3212684b81",
      });
    });
  });

  describe("POST", () => {
    it("should return 400 when username is to long", async () => {
      const res = await request(app)
        .post("/api/user/me")
        .send({ username: "a".repeat(43) });

      expect(res.status).toBe(400);
    });

    it("should return 400 when bio is to long", async () => {
      const res = await request(app)
        .post("/api/user/me")
        .send({ bio: "a".repeat(501) });

      expect(res.status).toBe(400);
    });

    it("should return 200 OK when user is updated", async () => {
      const res = await request(app)
        .post("/api/user/me")
        .send({ username: "updatedUsername", bio: "updatedBio" });

      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        bio: "updatedBio",
        id: "0xddc2f17daCb8187AC0e26e6Bd852Ee3212684b81",
        username: "updatedUsername",
      });
    });
  });
});
