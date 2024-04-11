const mongoose= require('mongoose');
const path=require('path');
const dotenv=require('dotenv');
dotenv.config({path:path.resolve(__dirname,'./.env')})
const MONGO_URI=process.env.DB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        // You might want to handle this error appropriately, e.g., exit the process
        process.exit(1);
    }
};

module.exports = connectDB;