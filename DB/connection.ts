/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";

const MONGODB_URL = process.env.DB_URL;

if (!MONGODB_URL) {
  throw new Error("Please define the DB_URI environment variable inside .env");
}

const dbConnect = async () => {
  const connectionState = mongoose.connection.readyState;

  if (connectionState === 1) {
    console.log("Already connected");
    return;
  }

  if (connectionState === 2) {
    console.log("Connecting...");
    return;
  }

  console.log(MONGODB_URL);

  try {
    mongoose.connect(MONGODB_URL, {
      dbName: "foodRescueHub",
      bufferCommands: true,
    });
    console.log("Connected");
  } catch (err: any) {
    console.log("Error: ", err);
    throw new Error("Error: ", err);
  }
};

export default dbConnect;
