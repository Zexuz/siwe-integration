import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import { jwtAuth } from "./middlewares/authMiddleware";
import userRoutes from "./routes/userRoutes/userRoutes";

export const startServer = async (port: number) => {
  const app = express();

  // Middleware
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

export const startDb = async (connectionString: string) => {
  try {
    await mongoose.connect(connectionString, {});
  } catch (e: any) {
    console.error(`Error connecting to database: ${e.message}`);
    throw e;
  }
};
