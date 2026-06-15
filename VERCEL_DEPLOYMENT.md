# 🚀 Vercel Deployment Guide

## Overview

Your project has two parts:
1. **Frontend** (Static HTML/CSS/JS) → Deploy to **Vercel** ✅
2. **Backend** (Node.js/Express API) → Deploy to **Render/Railway** 

## 📦 Part 1: Deploy Backend to Render (Free)

### Step 1: Create Render Account
1. Go to: https://render.com
2. Sign up with your GitHub account
3. Authorize Render to access your repositories

### Step 2: Create Web Service
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository: `jaldhara-rajasthan`
3. Configure:
   - **Name**: `jaldhara-backend`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

### Step 3: Add Environment Variables
Click "Advanced" and add these:

```
NODE_ENV=production
PORT=10000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_random_string_here
JWT_EXPIRES_IN=7d
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_strong_password
ADMIN_NAME=Admin
TRANSLATE_ENGINE=libretranslate
LIBRETRANSLATE_URL=http://localhost:5001
```

### Step 4: Get MongoDB Atlas (Free)
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Create free cluster (M0)
3. Create database user
4. Whitelist IP: `0.0.0.0/0` (allow all)
5. Get connection string
6. Add it to `MONGODB_URI` in Render

### Step 5: Deploy Backend
1. Click **"Create Web Service"**
2. Wait for deployment (2-3 minutes)
3. Your backend will be at: `https://jaldhara-backend.onrender.com`
4. Test it: Visit `https://jaldhara-backend.onrender.com/api/health`

### Step 6: Run Seed Script (Create Admin)
In Render dashboard:
1. Go to your service
2. Click "Shell" tab
3. Run: `npm run seed`

## 🌐 Part 2: Deploy Frontend to Vercel

### Method A: Vercel CLI (Recommended)

#### Step 1: Install Vercel CLI
Open Command Prompt in your project folder:

```bash
npm install -g vercel
```

#### Step 2: Update Frontend API URL
Edit `frontend/app.js` and update the API URL:

```javascript
// Change this line:
const API_URL = 'http://localhost:5000/api';

// To your Render backend URL:
const API_URL = 'https://jaldhara-backend.onrender.com/api';
```

#### Step 3: Deploy to Vercel
```bash
cd frontend
vercel
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? Choose your account
- Link to existing project? **N**
- Project name: `jaldhara-rajasthan`
- In which directory is your code? `./`
- Want to override settings? **N**

#### Step 4: Deploy to Production
```bash
vercel --prod
```

Your site will be live at: `https://jaldhara-rajasthan.vercel.app`

### Method B: Vercel Dashboard (Easier)

#### Step 1: Update Frontend API URL
Edit `frontend/app.js`:

```javascript
const API_URL = 'https://jaldhara-backend.onrender.com/api';
```

#### Step 2: Commit and Push Changes
```bash
git add .
git commit -m "Update API URL for production"
git push
```

#### Step 3: Deploy on Vercel
1. Go to: https://vercel.com/signup
2. Sign up with GitHub
3. Click **"New Project"**
4. Import `jaldhara-rajsthan` repository
5. Configure:
   - **Framework Preset**: Other
   - **Root Directory**: `frontend`
   - **Build Command**: Leave empty
   - **Output Directory**: `./`
6. Click **"Deploy"**

Your site will be live at: `https://jaldhara-rajasthan.vercel.app`

## 🔧 Update CORS in Backend

After deploying frontend, update backend CORS:

Edit `backend/server.js`:

```javascript
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://jaldhara-rajasthan.vercel.app',  // Add your Vercel URL
    'https://*.vercel.app'  // Allow all Vercel preview deployments
  ],
  credentials: true
};

app.use(cors(corsOptions));
```

Commit and push to redeploy.

## ✅ Verify Deployment

### Backend:
```bash
curl https://jaldhara-backend.onrender.com/api/health
# Should return: {"ok":true}
```

### Frontend:
Visit: `https://jaldhara-rajasthan.vercel.app`

### Admin Dashboard:
Visit: `https://jaldhara-rajasthan.vercel.app/admin/index.html`
Login with your admin credentials.

## 🐛 Troubleshooting

### Frontend can't connect to backend:
- Check API_URL in frontend/app.js
- Check CORS settings in backend/server.js
- Verify backend is running on Render

### Backend won't start:
- Check environment variables in Render
- Check MongoDB connection string
- View logs in Render dashboard

### Admin can't login:
- Run seed script on Render: `npm run seed`
- Check JWT_SECRET is set
- Check credentials

## 📊 Monitoring

### Render:
- Free tier sleeps after 15 minutes of inactivity
- First request after sleep takes ~30 seconds
- Upgrade to paid tier for always-on service

### Vercel:
- Free tier: Unlimited deployments
- Automatic HTTPS
- Global CDN

## 💰 Costs

- **Vercel Frontend**: FREE forever
- **Render Backend**: FREE (with limitations)
- **MongoDB Atlas**: FREE (M0 tier, 512MB)

## 🔄 Future Updates

When you make changes:

```bash
git add .
git commit -m "Your changes"
git push
```

- Render will auto-deploy backend
- Vercel will auto-deploy frontend

## 📞 Support

- Vercel Docs: https://vercel.com/docs
- Render Docs: https://render.com/docs
- MongoDB Docs: https://docs.mongodb.com/

---

**Your app will be live in ~10 minutes!** 🎉
