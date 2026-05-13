import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

export async function connectDB(){
   await mongoose.connect(process.env.MONGO_URI);
}

// move to env file