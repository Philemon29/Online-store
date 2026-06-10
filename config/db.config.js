const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

const url = "mongodb://127.0.0.1:27017/expressclass22"

const connectDB = async () => {
  try {
    await mongoose.connect(url);
    console.log("✅ MongoDB Connected...");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
