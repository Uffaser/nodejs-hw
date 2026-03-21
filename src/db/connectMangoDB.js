import mongoose from 'mongoose';

export const connectMongoDB = async () => {
  try {
    const mangoUrl = process.env.MANGO_URL;
    await mongoose.connect(mangoUrl);
    console.log('✅ MongoDB connection established successfully');
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error.message);
    process.exit(1);
  }
};
