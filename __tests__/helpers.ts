import express from "express";
import cors from "cors";
import authRoutes from "../src/routes/authRoutes/authRoutes";
import userRoutes from "../src/routes/userRoutes/userRoutes";

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
  req.userId = "0xddc2f17daCb8187AC0e26e6Bd852Ee3212684b81";
  req.getUserIdOrFail = () => "0xddc2f17daCb8187AC0e26e6Bd852Ee3212684b81";
  next();
};
