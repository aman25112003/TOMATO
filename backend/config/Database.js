import mongoose from "mongoose";

export const connectDB = async()=>{
    await mongoose.connect("mongodb+srv://amansingh20032511:A1RkghMOXRZuf8vW@cluster0.baaxfhs.mongodb.net/Tomato").then(()=>console.log("DB connected successfully"));
}