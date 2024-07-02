import mongoose from "mongoose";

const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Connected to MongoDB");

    } catch {
        console.log("Error connecting to MongoDB", error.message);
    }
}

export default connectMongoDB;