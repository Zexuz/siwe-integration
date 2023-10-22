import express from "express";
import cors from "cors";
import authRoutes from "../src/routes/authRoutes/authRoutes";
import userRoutes from "../src/routes/userRoutes/userRoutes";

const generateRandomEthAddress = () => {
  const chars = "0123456789abcdef";
  let hex = "0x";
  for (let i = 0; i < 40; i++) {
    hex += chars[Math.floor(Math.random() * chars.length)];
  }
  return hex;
};

export const USER_ID = generateRandomEthAddress();

export const initApp = () => {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Routes
  app.use("/api/auth", authRoutes);
  app.use("/api/user", fakeAuthMiddleware, userRoutes);
  return app;
};

const fakeAuthMiddleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  req.userId = USER_ID;
  req.getUserIdOrFail = () => USER_ID;
  next();
};
