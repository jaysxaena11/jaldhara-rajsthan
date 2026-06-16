import express from 'express';
import fetch from 'node-fetch';
import { authRequired, adminOnly } from '../middleware/auth.js';
import { getAuthUrl, exchangeCode, importFromBlogger } from '../services/blogger.js';
import Article from '../models/Article.js';

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

// Manual import trigger via OAuth (admin)
router.post('/sync', authRequired, adminOnly, async (req, res) => {
  try {
    const result = await importFromBlogger();
    res.json(result);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ── PUBLIC BLOGGER IMPORT via RSS (no OAuth needed) ──
// POST /api/blogger/import-rss  { blogId: "1094692514066595996" }
router.post('/import-rss', authRequired, adminOnly, async (req, res) => {
  try {
    const blogId = req.body.blogId || process.env.BLOGGER_BLOG_ID;
    if (!blogId) return res.status(400).json({ error: 'blogId आवश्यक है' });

    let imported = 0;
    let skipped  = 0;
    let pageToken = null;
    let allPosts  = [];

    // Fetch all posts using Blogger public API (paginated)
    do {
      let url = `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts?maxResults=50&fetchBodies=true&fetchImages=true&status=live`;
      if (pageToken) url += `&pageToken=${pageToken}`;
      // Try with API key if available, otherwise without
      if (process.env.GOOGLE_TRANSLATE_API_KEY) {
        url += `&key=${process.env.GOOGLE_TRANSLATE_API_KEY}`;
      }
      const response = await fetch(url);
      if (!response.ok) {
        // Fallback to RSS feed
        break;
      }
      const data = await response.json();
      if (data.items) allPosts = allPosts.concat(data.items);
      pageToken = data.nextPageToken || null;
    } while (pageToken);

    // If API failed or returned nothing, try RSS feed
    if (allPosts.length === 0) {
      const rssUrl = `https://${blogId}.blogspot.com/feeds/posts/default?alt=json&max-results=500`;
      const rssRes = await fetch(rssUrl);
      if (!rssRes.ok) {
        // Try another RSS format
        const rssUrl2 = `https://www.blogger.com/feeds/${blogId}/posts/default?alt=json&max-results=500`;
        const rssRes2 = await fetch(rssUrl2);
        if (!rssRes2.ok) return res.status(400).json({ error: 'Blogger से कनेक्शन विफल। blogId जाँचें।' });
        const rssData2 = await rssRes2.json();
        const entries  = rssData2.feed?.entry || [];
        for (const entry of entries) {
          allPosts.push({
            id:      entry.id?.$t?.split('-').pop() || null,
            title:   entry.title?.$t || 'शीर्षक नहीं',
            content: entry.content?.$t || entry.summary?.$t || '',
            images:  [],
            labels:  (entry.category || []).map(c => c.term)
          });
        }
      } else {
        const rssData = await rssRes.json();
        const entries = rssData.feed?.entry || [];
        for (const entry of entries) {
          allPosts.push({
            id:      entry.id?.$t?.split('-').pop() || null,
            title:   entry.title?.$t || 'शीर्षक नहीं',
            content: entry.content?.$t || entry.summary?.$t || '',
            images:  [],
            labels:  (entry.category || []).map(c => c.term)
          });
        }
      }
    }

    // Save each post to DB
    for (const post of allPosts) {
      const postId = post.id || post.bloggerPostId;
      // Skip if already imported
      if (postId) {
        const exists = await Article.findOne({ bloggerPostId: String(postId) });
        if (exists) { skipped++; continue; }
      }

      const title   = post.title || 'शीर्षक नहीं';
      const body    = post.content || post.body || '';
      const excerpt = body.replace(/<[^>]+>/g, '').slice(0, 200);
      const labels  = post.labels || [];
      const category = labels.length > 0 ? labels[0] : 'ब्लॉग';

      // Get featured image from post
      let featuredImage = '';
      if (post.images && post.images.length > 0) {
        featuredImage = post.images[0].url || '';
      } else {
        // Extract first image from HTML body
        const imgMatch = body.match(/<img[^>]+src=["']([^"']+)["']/i);
        if (imgMatch) featuredImage = imgMatch[1];
      }

      await Article.create({
        title,
        body,
        excerpt,
        category,
        featuredImage,
        bloggerPostId: postId ? String(postId) : null,
        status:   'published',
        language: 'hi',
        type:     'article'
      });
      imported++;
    }

    res.json({
      success: true,
      message: `✅ ${imported} नए लेख आयात हुए, ${skipped} पहले से मौजूद थे।`,
      imported,
      skipped,
      total: allPosts.length
    });

  } catch (e) {
    console.error('RSS Import error:', e);
    res.status(500).json({ error: e.message });
  }
});

export default router;
