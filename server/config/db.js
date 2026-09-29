const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/careercraftai';
    
    // Attempt standard MongoDB connection with a short timeout
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 2000
    });
    
    console.log(`🍃 MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`⚠️ Local MongoDB server not detected on ${process.env.MONGO_URI}. Starting embedded MongoMemoryServer for development...`);
    
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongoServer = await MongoMemoryServer.create();
      const inMemoryUri = mongoServer.getUri();
      
      const conn = await mongoose.connect(inMemoryUri);
      console.log(`🍃 Embedded MongoDB Memory Server Connected: ${conn.connection.host}`);
    } catch (memError) {
      console.error('❌ MongoDB Connection Error:', memError.message);
      process.exit(1);
    }
  }
};

module.exports = connectDB;
