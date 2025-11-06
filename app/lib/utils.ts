import mongoose, { ConnectionStates } from "mongoose"

interface Connection {
    isConnected?: ConnectionStates;
}

export const connectToDb = async () => {
    const connection: Connection = {}
    if (connection.isConnected) return;
    if (!process.env.MONGODB_URI) {
        throw new Error("❌ MONGODB_URI is not defined in environment variables");
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI!)
        connection.isConnected = db.connections[0].readyState
        console.log("Database connected")
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error);
        throw new Error("Could not connect to the database")
    }
}