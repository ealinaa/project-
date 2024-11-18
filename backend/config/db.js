import mongoose from "mongoose";
export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://alinaadhikari108:12345678AA@cluster0.tgjyg.mongodb.net/food-delivery').then(()=>console.log("MongoDb Connected Successfully"));

}