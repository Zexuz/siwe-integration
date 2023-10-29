import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes/authRoutes";
import { jwtAuth } from "./middlewares/authMiddleware";
import userRoutes from "./routes/userRoutes/userRoutes";
import { logErrorMiddleware } from "./middlewares/errorMiddleware";

export const startServer = async (port: number) => {
  const app = express();

  // Middleware
  app.use(logErrorMiddleware());
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Routes
  app.use("/api/auth", authRoutes);
  app.use("/api/user", jwtAuth, userRoutes);

  // Start the server
  return app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
};
