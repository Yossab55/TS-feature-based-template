import mongoose from "mongoose";
import { mongoDBConfig } from "../config/mongoDB.js";

/**
 * Connects to MongoDB using Mongoose with connection pool settings tuned for
 * Sawa's long-running Node.js OLTP server on a Hostinger KVM VPS.
 */
export async function connectMongoDB(): Promise<typeof mongoose> {
  try {
    const connection = await mongoose.connect(mongoDBConfig.MONGO_URI, {
      // Conservative upper bound for an asynchronous Node.js event loop on a KVM VPS
      maxPoolSize: 20,
      // Keep a small set of pre-warmed connections ready for low-latency OLTP requests
      minPoolSize: 5,
      // Prune connections idle for more than 5 minutes between study sessions
      maxIdleTimeMS: 300_000,
      // Fail fast (10s) if the initial TCP/TLS connection cannot be established
      connectTimeoutMS: 10_000,
      // Prevent hanging sockets (30s) on short OLTP queries (users, meetings, messages)
      socketTimeoutMS: 30_000,
      // Fail fast (5s) if the MongoDB server/primary is unreachable
      serverSelectionTimeoutMS: 5_000,
    });

    console.log(`MongoDB connected: ${connection.connection.host}`);
    return connection;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}

export default connectMongoDB;
