import mongoose from "mongoose";


type ConnectionType = {
  isConnected?: number | boolean;
};

const connection: ConnectionType = {};

export default async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already connected to the database");
    return;
  }
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("Please add your Mongo URI to .env.local");
    }
    const db = await mongoose.connect(
      process.env.MONGODB_URI || "",
      {}
    );
    connection.isConnected = db.connections[0].readyState;
    console.log("MongoDB connected successfully", db.connections[0].name);
  } catch (error) {
    if(process.env.NODE_ENV === "development") {
        console.log(error);
    }
    console.error("Something goes wrong!");
    throw new Error("Error connecting to the database");
  }
}
