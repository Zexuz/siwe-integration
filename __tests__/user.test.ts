import request from "supertest";
import dotenv from "dotenv";
import { initApp, USER_ID } from "./helpers";
import { startDb } from "../src/config/db";
import { User } from "../src/models/userModel";

dotenv.config({ path: ".env.test" });

const app = initApp();

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

describe("/api/user/me", () => {
  describe("GET", () => {
    it("should return 200 OK", async () => {
      const res = await request(app).get("/api/user/me");

      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        bio: "",
        id: USER_ID,
        username: USER_ID,
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
        id: USER_ID,
        username: "updatedUsername",
      });
    });
  });
});
