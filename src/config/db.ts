import { PrismaClient } from '@prisma/client';
import mongoose from 'mongoose';
import config from './config';

export const prisma = new PrismaClient();

export const connectDB = async () => {
  try {
    if (!config.mongoURI) throw new Error('MongoDB connection URI is not defined in the configuration.');
    await mongoose.connect(config.mongoURI);
    console.log('MongoDB connected successfully!');
  } catch (err) {
    console.log(err);
  }
};
