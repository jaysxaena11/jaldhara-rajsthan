# 🔐 Environment Variables Setup Guide

## 📋 What are Environment Variables?

Environment variables are configuration settings for your application. They store sensitive data like passwords, API keys, and database connections that should NOT be committed to GitHub.

---

## 🚀 Quick Setup (For Local Development)

Your current `.env` file is already configured for local development! ✅

### Current Settings:
```
✅ Backend Port: 5000
✅ MongoDB: Local (localhost:27017)
✅ Admin: admin@example.com / change_me
✅ Translation: LibreTranslate (optional)
```

**You're ready to go!** No changes needed for local development.

---

## 🔒 Recommended: Improve Security

### 1. Generate Strong JWT Secret

**Current (WEAK):**
```
JWT_SECRET=change_this_to_a_long_random_secret
```

**Replace with Strong Random String:**

Open terminal and run:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output and update `.env`:
```
JWT_SECRET=a8f5f167f44f4964e6c998dee827110c03f1a7c7e4c4c7a7e3e9e4e5e8e9e0e1
```

### 2. Change Admin Password

**Current (WEAK):**
```
ADMIN_PASSWORD=change_me
```

**Update to Strong Password:**
```
ADMIN_PASSWORD=YourStrongPassword123!
```

Then run seed script again:
```bash
npm run seed
```

---

## 📝 Environment Variables Explained

### Required Variables (Already Set ✅)

#### **PORT**
```
PORT=5000
```
- The port your backend server runs on
- Default: 5000
- Change if port 5000 is already in use

#### **NODE_ENV**
```
NODE_ENV=development
```
- `development` = Local development (shows detailed errors)
- `production` = Live deployment (hides sensitive errors)

#### **MONGODB_URI**
```
MONGODB_URI=mongodb://localhost:27017/jal_dhara_jaipur
```
- Your MongoDB connection string
- Current: Local MongoDB
- For production: Use MongoDB Atlas (see below)

#### **JWT_SECRET**
```
JWT_SECRET=change_this_to_a_long_random_secret
```
- Secret key for authentication tokens
- ⚠️ IMPORTANT: Use a strong random string (see above)
- Never share this!

#### **JWT_EXPIRES_IN**
```
JWT_EXPIRES_IN=7d
```
- How long admin login tokens last
- `7d` = 7 days
- Can be: `1h`, `24h`, `30d`, etc.

#### **Admin Credentials**
```
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=change_me
ADMIN_NAME=Admin
```
- Used by seed script to create first admin
- Change these for security!

---

### Optional Variables (Can be Empty)

#### **Translation Service**
```
TRANSLATE_ENGINE=libretranslate
LIBRETRANSLATE_URL=http://localhost:5001
```
- `libretranslate` = Use local Docker container (free)
- `google` = Use Google Translate API (requires API key)
- Leave as is unless you need translation features

#### **Google Blogger Integration**
```
BLOGGER_CLIENT_ID=
BLOGGER_CLIENT_SECRET=
BLOGGER_REDIRECT_URI=http://localhost:5000/api/blogger/oauth/callback
BLOGGER_BLOG_ID=
BLOGGER_REFRESH_TOKEN=
```
- Only needed if syncing with Google Blogger
- Leave empty if not using Blogger
- See BLOGGER_SETUP.md for detailed instructions

---

## 🌐 Production Environment Variables

When deploying to Render/Vercel/Heroku, update these:

### For Render/Railway/Heroku:

```bash
# Change to production
NODE_ENV=production

# Use MongoDB Atlas (free cloud database)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/jal_dhara_jaipur

# Generate strong JWT secret (never reuse from development!)
JWT_SECRET=<generate new random string>

# Your actual admin credentials
ADMIN_EMAIL=your-email@example.com
ADMIN_PASSWORD=<strong-password>
ADMIN_NAME=Your Name

# Translation (optional)
TRANSLATE_ENGINE=google
GOOGLE_TRANSLATE_API_KEY=your_google_api_key_here
```

---

## 🗄️ MongoDB Setup Options

### Option 1: Local MongoDB (Current ✅)

**Already working!** No changes needed.

**Requirements:**
- MongoDB installed locally
- Running as a service

**Connection String:**
```
MONGODB_URI=mongodb://localhost:27017/jal_dhara_jaipur
```

### Option 2: MongoDB Atlas (Cloud - Free)

**For Production or if local MongoDB not working:**

1. **Sign up**: https://mongodb.com/cloud/atlas
2. **Create Cluster**: Choose FREE M0 tier
3. **Create Database User**:
   - Username: `jaldhara`
   - Password: (generate strong password)
4. **Network Access**: Add IP `0.0.0.0/0` (allow from anywhere)
5. **Get Connection String**:
   - Click "Connect" → "Connect your application"
   - Copy string (looks like: `mongodb+srv://...`)
   - Replace `<password>` with your database password

**Update .env:**
```
MONGODB_URI=mongodb+srv://jaldhara:yourpassword@cluster0.xxxxx.mongodb.net/jal_dhara_jaipur?retryWrites=true&w=majority
```

---

## 🔐 Security Best Practices

### ✅ DO:
- ✅ Use strong, random JWT_SECRET
- ✅ Use strong ADMIN_PASSWORD
- ✅ Keep `.env` file private (it's in .gitignore)
- ✅ Use different secrets for development and production
- ✅ Generate new JWT_SECRET for production

### ❌ DON'T:
- ❌ Commit `.env` to GitHub (use .env.example instead)
- ❌ Share your `.env` file
- ❌ Use weak passwords
- ❌ Reuse the same JWT_SECRET in multiple environments
- ❌ Share API keys publicly

---

## 🧪 Testing Your Configuration

### 1. Test Backend Connection
```bash
cd backend
npm start
```

Look for:
```
MongoDB connected ✓
Server: http://localhost:5000 ✓
```

### 2. Test API
Open browser: http://localhost:5000/api/health

Should return: `{"ok":true}`

### 3. Test Admin Login
1. Run seed: `npm run seed`
2. Open `admin/index.html`
3. Login with credentials from `.env`

---

## 📝 Quick Reference

### Update JWT Secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Update Admin:
1. Edit `.env` - Change ADMIN_EMAIL and ADMIN_PASSWORD
2. Run: `npm run seed`

### Switch to MongoDB Atlas:
1. Get connection string from MongoDB Atlas
2. Update MONGODB_URI in `.env`
3. Restart backend

### Add Google Translation:
1. Get API key from Google Cloud
2. Update `.env`:
   ```
   TRANSLATE_ENGINE=google
   GOOGLE_TRANSLATE_API_KEY=your_key_here
   ```
3. Restart backend

---

## 🆘 Troubleshooting

### "MongoDB connection failed"
- Check MongoDB is running (local)
- OR verify MongoDB Atlas connection string
- Check firewall/network settings

### "JWT malformed" or "Invalid token"
- Clear browser cache
- Logout and login again
- Check JWT_SECRET hasn't changed

### "Admin not found"
- Run seed script: `npm run seed`
- Check ADMIN_EMAIL matches login

### Environment variables not loading
- Check `.env` file is in `backend` folder
- Check file is named exactly `.env` (not `.env.txt`)
- Restart backend server after changes

---

## 📞 Need Help?

- MongoDB Atlas Guide: https://docs.mongodb.com/cloud/atlas/
- JWT Documentation: https://jwt.io/
- Google Translate API: https://cloud.google.com/translate/docs

---

## ✨ Recommended Immediate Actions

For better security RIGHT NOW:

```bash
# 1. Generate strong JWT secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
# Copy output to JWT_SECRET in .env

# 2. Update admin password in .env
# Change ADMIN_PASSWORD=change_me to something strong

# 3. Re-run seed script
npm run seed

# 4. Restart backend
npm start
```

Done! Your environment is now more secure! 🔒
