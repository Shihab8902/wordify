require("dotenv").config();

const mongoose = require("mongoose")

const connectDB = async () => {
    await mongoose.connect(process.env.DB_URI, { dbName: process.env.DB_NAME });
    console.log("Connected to the database successfully!");
}

module.exports = connectDB;