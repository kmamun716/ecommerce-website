import mongoose, { ConnectionStates } from "mongoose";

interface MongooseConnection {
  isConnected?: ConnectionStates;
}

const cached: MongooseConnection = {}; // global cached connection

export const connectToDb = async () => {
  if (cached.isConnected) return;

  if (!process.env.MONGODB_URI) {
    throw new Error("❌ MONGODB_URI is not defined in environment variables");
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI!);
    cached.isConnected = db.connection.readyState;
    console.log("✅ MongoDB connected");
    return db;
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    throw new Error("Could not connect to the database");
  }
};
