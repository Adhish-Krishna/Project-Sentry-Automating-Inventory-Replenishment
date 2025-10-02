import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/"
const connectDB = async ()=>{
    try{
        await mongoose.connect(MONGO_URI);
        console.log("MONGODB connected!");
    }catch(err){
        console.log("Cannot connect to MONGODB successfully", err);
    }
}

export default connectDB;