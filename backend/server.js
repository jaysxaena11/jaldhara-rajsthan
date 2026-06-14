import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.js';
import articleRoutes from './routes/articles.js';
import bloggerRoutes from './routes/blogger.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.get('/api/health', (req, res) => res.json({ ok: true }));
app.use('/api/auth', authRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/blogger', bloggerRoutes);

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server: http://localhost:${PORT}`));
}).catch((e) => { console.error(e); process.exit(1); });
