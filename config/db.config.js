const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('Attempting MongoDB connection...');

    await mongoose.connect('mongodb://127.0.0.1:27017/expressclass22');

    console.log('MONGODB CONNECTED SUCCESSFULLY');
  } catch (error) {
    console.error('FULL ERROR:');
    console.error(error);

    process.exit(1);
  }
};

module.exports = connectDB;