# 🚀 Deployment Guide

## GitHub Deployment

### Step 1: Install Git (if not already installed)
Download and install Git from: https://git-scm.com/download/win

### Step 2: Create a GitHub Repository
1. Go to https://github.com
2. Click on "New repository" button
3. Name it: `jal-dhara-jaipur`
4. Choose Public or Private
5. **DO NOT** initialize with README (we already have one)
6. Click "Create repository"

### Step 3: Push to GitHub

Open your terminal in the project folder and run:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit: Jal Dhara Jaipur multilingual blog platform"

# Add your GitHub repository as remote (replace YOUR-USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR-USERNAME/jal-dhara-jaipur.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## 🌐 Production Deployment Options

### Option 1: Deploy to Render (Recommended - Free Tier Available)

**Backend Deployment:**
1. Go to https://render.com
2. Sign up/Login with GitHub
3. Click "New" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Name:** jal-dhara-backend
   - **Root Directory:** backend
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
6. Add Environment Variables (from .env):
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`
   - etc.
7. Click "Create Web Service"

**Frontend Deployment:**
1. Deploy frontend folder to Netlify or Vercel (see below)

### Option 2: Deploy to Railway

1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Railway will auto-detect Node.js
6. Add environment variables
7. Deploy!

### Option 3: Deploy Frontend to Netlify

1. Go to https://netlify.com
2. Drag and drop the `frontend` folder
3. Update `app.js` with your backend URL:
```javascript
const API_URL = 'https://your-backend-url.onrender.com/api';
```

### Option 4: Deploy to Vercel

**Frontend:**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy frontend
cd frontend
vercel
```

**Backend:**
Deploy backend separately to Render/Railway/Heroku

### Option 5: Deploy to Heroku

```bash
# Install Heroku CLI from: https://devcenter.heroku.com/articles/heroku-cli

# Login
heroku login

# Create app
heroku create jal-dhara-backend

# Add MongoDB addon
heroku addons:create mongolab

# Set environment variables
heroku config:set JWT_SECRET=your_secret_here
heroku config:set ADMIN_EMAIL=admin@example.com
heroku config:set ADMIN_PASSWORD=your_password

# Deploy
git push heroku main

# Run seed script
heroku run npm run seed
```

## 🔧 Environment Variables for Production

Make sure to set these in your hosting platform:

### Required:
- `NODE_ENV=production`
- `MONGODB_URI` - Your MongoDB connection string
- `JWT_SECRET` - Strong random secret (use: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
- `ADMIN_EMAIL` - Admin email
- `ADMIN_PASSWORD` - Strong admin password

### Optional:
- `PORT` - Server port (usually auto-set by hosting)
- `TRANSLATE_ENGINE` - `libretranslate` or `google`
- `BLOGGER_CLIENT_ID` - For Blogger integration
- `BLOGGER_CLIENT_SECRET` - For Blogger integration
- `BLOGGER_BLOG_ID` - Your Blogger blog ID

## 📊 MongoDB Setup

### Option 1: MongoDB Atlas (Recommended - Free Tier)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create new cluster (M0 Free tier)
4. Create database user
5. Whitelist IP: `0.0.0.0/0` (allow from anywhere)
6. Get connection string
7. Use it as `MONGODB_URI`

### Option 2: Local MongoDB
- Keep your local MongoDB for development
- Use MongoDB Atlas or other cloud provider for production

## 🔐 Security Checklist

- [ ] Change default admin password
- [ ] Use strong JWT_SECRET (32+ characters random)
- [ ] Set NODE_ENV=production
- [ ] Enable CORS only for your frontend domain
- [ ] Use HTTPS in production
- [ ] Keep .env file secret (it's in .gitignore)
- [ ] Regular security updates: `npm audit fix`

## 📱 Post-Deployment Steps

1. **Test the API:**
```bash
curl https://your-backend-url.com/api/health
# Should return: {"ok":true}
```

2. **Login to Admin:**
- Open admin dashboard
- Login with your admin credentials
- Create your first article

3. **Update Frontend API URL:**
- Edit `frontend/app.js`
- Update `API_URL` constant to your backend URL

4. **Run Seed Script** (if needed):
```bash
# On Render/Railway - use their CLI or dashboard
# On Heroku:
heroku run npm run seed
```

## 🐛 Troubleshooting

### Backend won't start:
- Check environment variables are set
- Check MongoDB connection string
- Check logs in your hosting dashboard

### Frontend can't connect to backend:
- Update API_URL in frontend/app.js
- Check CORS settings in backend
- Check backend is running

### Database connection failed:
- Verify MongoDB URI is correct
- Check MongoDB Atlas IP whitelist
- Ensure database user credentials are correct

## 📞 Support

For issues, please create an issue on GitHub:
https://github.com/YOUR-USERNAME/jal-dhara-jaipur/issues

---

**Good luck with your deployment! 🎉**
