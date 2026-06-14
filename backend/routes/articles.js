import express from 'express';
import Article from '../models/Article.js';
import { authRequired, adminOnly } from '../middleware/auth.js';
import { translate } from '../services/translate.js';
import { publishToBlogger, deleteFromBlogger } from '../services/blogger.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

// PUBLIC: list (sort: latest|oldest, optional type filter)
router.get('/', async (req, res) => {
  const sort = req.query.sort === 'oldest' ? 1 : -1;
  const filter = { status: 'published' };
  if (req.query.type) filter.type = req.query.type;
  const articles = await Article.find(filter).sort({ createdAt: sort });
  res.json(articles);
});

// PUBLIC: single, with optional ?lang=xx translation (cached in DB)
router.get('/:id', async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (!article) return res.status(404).json({ error: 'लेख नहीं मिला' });

  const lang = req.query.lang;
  if (lang && lang !== article.language) {
    const cached = article.translations?.get(lang);
    if (cached) return res.json({ ...article.toObject(), title: cached.title, body: cached.body });
    const title = await translate(article.title, lang, article.language);
    const body = await translate(article.body, lang, article.language);
    article.translations.set(lang, { title, body });
    await article.save();
    return res.json({ ...article.toObject(), title, body });
  }
  res.json(article);
});

// ADMIN: create (+ optional auto-publish to Blogger)
router.post('/', authRequired, adminOnly, upload.single('image'), async (req, res) => {
  const payload = { ...req.body };
  if (req.file) payload.featuredImage = `/uploads/${req.file.filename}`;
  const article = await Article.create(payload);
  if (process.env.BLOGGER_REFRESH_TOKEN) {
    try {
      article.bloggerPostId = await publishToBlogger(article);
      await article.save();
    } catch (e) { console.error('Blogger publish failed:', e.message); }
  }
  res.status(201).json(article);
});

// ADMIN: update (+ sync to Blogger)
router.put('/:id', authRequired, adminOnly, async (req, res) => {
  const article = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!article) return res.status(404).json({ error: 'लेख नहीं मिला' });
  if (article.bloggerPostId && process.env.BLOGGER_REFRESH_TOKEN) {
    try { await publishToBlogger(article); } catch (e) { console.error(e.message); }
  }
  res.json(article);
});

// ADMIN: delete (+ delete on Blogger)
router.delete('/:id', authRequired, adminOnly, async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (!article) return res.status(404).json({ error: 'लेख नहीं मिला' });
  if (article.bloggerPostId && process.env.BLOGGER_REFRESH_TOKEN) {
    try { await deleteFromBlogger(article.bloggerPostId); } catch (e) { console.error(e.message); }
  }
  await article.deleteOne();
  res.json({ ok: true });
});

// ADMIN: dashboard stats
router.get('/admin/stats', authRequired, adminOnly, async (req, res) => {
  const [articles, vlogs] = await Promise.all([
    Article.countDocuments({ type: 'article' }),
    Article.countDocuments({ type: 'vlog' })
  ]);
  const categories = (await Article.distinct('category')).length;
  res.json({ articles, vlogs, categories, languages: 20 });
});

export default router;
