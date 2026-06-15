import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.js';
import articleRoutes from './routes/articles.js';
import bloggerRoutes from './routes/blogger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// API routes
app.get('/api/health', (req, res) => res.json({ ok: true }));
app.use('/api/auth', authRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/blogger', bloggerRoutes);

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../frontend')));
app.use('/admin', express.static(path.join(__dirname, '../admin')));

// SPA fallback for frontend
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

const PORT = process.env.PORT || 5000;
connectDB().then(async () => {
  // Auto-seed admin user on startup if not exists
  try {
    const User = (await import('./models/User.js')).default;
    const existingAdmin = await User.findOne({ email: process.env.ADMIN_EMAIL });
    if (!existingAdmin && process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
      const bcrypt = (await import('bcryptjs')).default;
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
      await User.create({
        name: process.env.ADMIN_NAME || 'Admin',
        email: process.env.ADMIN_EMAIL,
        password: hashedPassword,
        role: 'admin'
      });
      console.log('✓ Admin user created automatically');
    }
  } catch (err) {
    console.log('Admin user check:', err.message);
  }
  
  app.listen(PORT, () => console.log(`Server: http://localhost:${PORT}`));
}).catch((e) => { console.error(e); process.exit(1); });
