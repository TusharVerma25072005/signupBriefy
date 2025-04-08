import mongoose from "mongoose";

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://tusharmadara3:M3UfWnjAypmR5Lvh@signupbriefy.aff09zu.mongodb.net/?retryWrites=true&w=majority&appName=signupBriefy";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

// @ts-ignore
let cached = global.mongoose;

if (!cached) {
  // @ts-ignore
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI); // ✅ No options needed
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;
