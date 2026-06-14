import 'dotenv/config';
import { connectDB } from '../config/db.js';
import User from '../models/User.js';
import mongoose from 'mongoose';

async function run() {
  await connectDB();
  const email = (process.env.ADMIN_EMAIL || '').toLowerCase();
  const existing = await User.findOne({ email });
  if (existing) {
    console.log('Admin पहले से मौजूद है:', email);
  } else {
    await User.create({
      name: process.env.ADMIN_NAME || 'Admin',
      email,
      password: process.env.ADMIN_PASSWORD,
      role: 'admin'
    });
    console.log('Admin बन गया:', email);
  }
  await mongoose.disconnect();
  process.exit(0);
}
run();
