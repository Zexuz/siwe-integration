import request from "supertest";
import express from "express";
import cors from "cors";
import authRoutes from "../src/routes/authRoutes";
import userRoutes from "../src/routes/userRoutes/userRoutes";
import { User } from "../src/models/userModel";
import dotenv from "dotenv";
import { startDb } from "../src/config/db";

dotenv.config({ path: ".env.test" });

const fakeAuthMiddleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  req.userId = "0xddc2f17daCb8187AC0e26e6Bd852Ee3212684b81";
  req.getUserIdOrFail = () => "0xddc2f17daCb8187AC0e26e6Bd852Ee3212684b81";
  next();
};

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", fakeAuthMiddleware, userRoutes);

beforeAll(async () => {
  await startDb();

  const setUpUser = async () => {
    const newUser = new User({
      _id: "0xddc2f17daCb8187AC0e26e6Bd852Ee3212684b81",
      username: "0xddc2f17daCb8187AC0e26e6Bd852Ee3212684b81",
      bio: "",
    });
    await newUser.save();
  };

  return setUpUser();
});

afterAll(() => {
  const tearDownUser = async () => {
    await User.deleteMany({});
  };

  return tearDownUser();
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
