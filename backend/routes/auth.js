import express from 'express';
import jwt from 'jsonwebtoken';
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

export default router;
