import mongoose from "mongoose";

export async function connectDB(){
    await mongoose.connect(
  "mongodb+srv://Akshara_Kaushik:Mahi%401234@campusassistantdb.tbksvrt.mongodb.net/CampusAssistantDB?retryWrites=true&w=majority"
);
}

// move to env file