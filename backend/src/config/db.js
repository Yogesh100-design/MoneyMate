import mongoose from "mongoose";
import { DATABASE_NAME } from "../constants.js";
import dotenv from "dotenv";

dotenv.config();


const connectToMongodb = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGODB_URL}`
        );
        console.log(`✅ MongoDB connected! DB host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("❌ MongoDB connection failed!", error.message);
        process.exit(1);
    }
};

export default connectToMongodb;
