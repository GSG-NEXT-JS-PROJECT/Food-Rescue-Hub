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

  try {
    await mongoose.connect(MONGODB_URL, {
      dbName: "foodRescueHub",
      bufferCommands: true,
    });
    console.log("Connected");
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Failed to connect to the database");
    }
  }
};

export default dbConnect;
