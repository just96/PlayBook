import mongoose from "mongoose";

export const connectDataBase = async () => {
  const URI = process.env.MONGO_URI;

  if (!URI) {
    console.error("MONGO_URI not defined");
    process.exit(1);
  }

  try {
    await mongoose.connect(URI);
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error(`Error connecting to MongoDB ${error}`);
    process.exit(1);
  }
};
