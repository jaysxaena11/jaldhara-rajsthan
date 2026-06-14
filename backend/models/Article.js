import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  excerpt: { type: String, default: '' },
  category: { type: String, default: 'समाचार' },
  type: { type: String, enum: ['article', 'vlog'], default: 'article' },
  language: { type: String, default: 'hi' },
  status: { type: String, enum: ['published', 'draft'], default: 'published' },
  featuredImage: { type: String, default: '' },
  bloggerPostId: { type: String, default: null },
  translations: { type: Map, of: { title: String, body: String }, default: {} }
}, { timestamps: true });

export default mongoose.model('Article', articleSchema);
