import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: (email || '').toLowerCase() });
  if (!user) return res.status(401).json({ error: 'गलत ईमेल या पासवर्ड' });
  const ok = await user.comparePassword(password);
  if (!ok) return res.status(401).json({ error: 'गलत ईमेल या पासवर्ड' });

  const token = jwt.sign(
    { id: user._id, role: user.role, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
  res.json({ token, user: { name: user.name, email: user.email, role: user.role } });
});

// Temporary debug endpoint - DELETE after fixing
router.get('/debug-admin', async (req, res) => {
  try {
    const users = await User.find({});
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPass = process.env.ADMIN_PASSWORD;
    
    // Force recreate admin - DON'T hash manually, model will do it
    await User.deleteMany({ email: adminEmail?.toLowerCase() });
    const newAdmin = await User.create({
      name: 'Admin',
      email: adminEmail?.toLowerCase(),
      password: adminPass, // Model's pre-save will hash this
      role: 'admin'
    });
    
    res.json({ 
      message: 'Admin recreated (fixed double-hash issue)',
      email: newAdmin.email,
      existingUsers: users.length
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
