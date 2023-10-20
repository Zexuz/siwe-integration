import mongoose from "mongoose";
import { MONGODB_URI } from "./env";

export const startDb = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {});
  } catch (e: any) {
    console.error(`Error connecting to database: ${e.message}`);
    throw e;
  }
};
