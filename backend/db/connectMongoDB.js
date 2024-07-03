import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    console.log("Attempting to connect to MongoDB...");
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("Connected to MongoDB successfully");
    
    mongoose.connection.on('error', err => {
      console.error('MongoDB connection error:', err);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectMongoDB;
