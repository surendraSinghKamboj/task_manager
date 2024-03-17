import mongoose from "mongoose";

export async function connectToDatabase() {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("Database is already connected");
      return true;
    }

    const mongoURI = process.env.MONGO_URI;

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Database connected successfully");
    return true;
  } catch (error) {
    console.error("Database connection error:", error);
    return false;
  }
}