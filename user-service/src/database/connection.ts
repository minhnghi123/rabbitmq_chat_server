import mongoose from "mongoose";
import config from "../config/config";

export const connectDB = async () => {
  try {
    console.info("Connecting to database..." + config.MONGO_URI);
    await mongoose.connect(config.MONGO_URI!);
    console.info("Database connected successfully");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
