import express from 'express';
import { authRequired, adminOnly } from '../middleware/auth.js';
import { getAuthUrl, exchangeCode, importFromBlogger } from '../services/blogger.js';

const router = express.Router();

// Step 1: get OAuth consent URL (admin)
router.get('/oauth/url', authRequired, adminOnly, (req, res) => {
  res.json({ url: getAuthUrl() });
});

// Step 2: OAuth callback - returns refresh_token to put in .env
router.get('/oauth/callback', async (req, res) => {
  try {
    const tokens = await exchangeCode(req.query.code);
    res.json({
      message: 'इस refresh_token को .env में BLOGGER_REFRESH_TOKEN के रूप में डालें',
      refresh_token: tokens.refresh_token
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Manual import trigger (admin)
router.post('/sync', authRequired, adminOnly, async (req, res) => {
  try {
    const result = await importFromBlogger();
    res.json(result);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
