import { google } from 'googleapis';
import Article from '../models/Article.js';

function oauthClient() {
  return new google.auth.OAuth2(
    process.env.BLOGGER_CLIENT_ID,
    process.env.BLOGGER_CLIENT_SECRET,
    process.env.BLOGGER_REDIRECT_URI
  );
}

export function getAuthUrl() {
  const client = oauthClient();
  return client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: ['https://www.googleapis.com/auth/blogger']
  });
}

export async function exchangeCode(code) {
  const client = oauthClient();
  const { tokens } = await client.getToken(code);
  return tokens; // contains refresh_token
}

function bloggerClient() {
  const client = oauthClient();
  client.setCredentials({ refresh_token: process.env.BLOGGER_REFRESH_TOKEN });
  return google.blogger({ version: 'v3', auth: client });
}

// Import existing Blogger posts -> local DB
export async function importFromBlogger() {
  const blogger = bloggerClient();
  const blogId = process.env.BLOGGER_BLOG_ID;
  const { data } = await blogger.posts.list({ blogId, maxResults: 50 });
  let imported = 0;
  for (const post of data.items || []) {
    const exists = await Article.findOne({ bloggerPostId: post.id });
    if (exists) continue;
    await Article.create({
      title: post.title,
      body: post.content || '',
      excerpt: (post.content || '').replace(/<[^>]+>/g, '').slice(0, 160),
      bloggerPostId: post.id,
      status: 'published',
      language: 'hi'
    });
    imported++;
  }
  return { imported };
}

// Publish a local article -> Blogger (and link via bloggerPostId)
export async function publishToBlogger(article) {
  const blogger = bloggerClient();
  const blogId = process.env.BLOGGER_BLOG_ID;
  if (article.bloggerPostId) {
    await blogger.posts.update({
      blogId, postId: article.bloggerPostId,
      requestBody: { title: article.title, content: article.body }
    });
    return article.bloggerPostId;
  }
  const { data } = await blogger.posts.insert({
    blogId,
    requestBody: { title: article.title, content: article.body }
  });
  return data.id;
}

export async function deleteFromBlogger(bloggerPostId) {
  if (!bloggerPostId) return;
  const blogger = bloggerClient();
  await blogger.posts.delete({ blogId: process.env.BLOGGER_BLOG_ID, postId: bloggerPostId });
}
