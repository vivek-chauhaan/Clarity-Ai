// lib/mongodb.ts
import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

interface MongooseConnection {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Extend global type so TS knows about `global.mongoose`
declare global {
  var mongoose: MongooseConnection | undefined;
}

let cached: MongooseConnection | undefined = global.mongoose;

if (!cached) {
  cached = { conn: null, promise: null };
  global.mongoose = cached;
}

async function dbConnect(): Promise<typeof mongoose> {
  if (cached?.conn) return cached.conn;

  if (!cached?.promise) {
    cached!.promise = mongoose.connect(MONGODB_URI);
  }

  cached!.conn = await cached!.promise;
  console.log("MongoDB connected successfully");

  return cached!.conn;
}

export default dbConnect;
