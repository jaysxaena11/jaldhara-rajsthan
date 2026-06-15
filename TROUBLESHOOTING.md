# 🔧 Troubleshooting Guide

## ❌ Common Issues and Solutions

### Issue 1: "Site not working" or "सर्वर से कनेक्शन नहीं"

**Cause:** Backend server is not running

**Solution:**
1. Double-click **`start-website.bat`** in your project folder
2. OR manually start backend:
   ```bash
   cd backend
   npm start
   ```
3. Keep the terminal window open
4. Refresh your browser

---

### Issue 2: Backend window closes immediately

**Cause:** Dependencies not installed or error in code

**Solution:**
```bash
cd backend
npm install
npm start
```

Check the error message in the terminal.

---

### Issue 3: "MongoDB connection failed"

**Cause:** MongoDB is not running

**Solution:**

**Option A: Install MongoDB Locally**
1. Download: https://www.mongodb.com/try/download/community
2. Install with default settings
3. MongoDB runs automatically as a service

**Option B: Use MongoDB Atlas (Cloud - Free)**
1. Go to: https://mongodb.com/cloud/atlas
2. Create free account
3. Create free cluster
4. Get connection string
5. Update `.env` in backend folder:
   ```
   MONGODB_URI=your_connection_string_here
   ```

---

### Issue 4: "Cannot GET /api/articles"

**Cause:** Backend not started or wrong URL

**Solution:**
1. Make sure backend is running (see Issue 1)
2. Check API URL in `frontend/app.js`:
   ```javascript
   const API = 'http://localhost:5000/api';
   ```
3. Test backend: Open http://localhost:5000/api/health in browser
   - Should show: `{"ok":true}`

---

### Issue 5: No articles showing / "अभी कोई लेख नहीं"

**Cause:** Database is empty

**Solution:**
1. Open admin dashboard: `admin/index.html`
2. Login with:
   - Email: `admin@example.com`
   - Password: `change_me`
3. Create some articles

OR use the API:
```bash
cd backend
npm run seed
```

---

### Issue 6: Can't login to admin

**Cause:** Admin user not created

**Solution:**
```bash
cd backend
npm run seed
```

Default credentials:
- Email: `admin@example.com`
- Password: `change_me`

---

### Issue 7: Port 5000 already in use

**Cause:** Another app is using port 5000

**Solution:**

**Option A: Stop the other app**
```bash
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F
```

**Option B: Change port**
Edit `backend/.env`:
```
PORT=5001
```

Edit `frontend/app.js`:
```javascript
const API = 'http://localhost:5001/api';
```

---

### Issue 8: "git is not recognized"

**Cause:** Git not installed

**Solution:**
1. Download: https://git-scm.com/download/win
2. Install with default settings
3. Restart terminal
4. Try again

---

### Issue 9: npm not working

**Cause:** Node.js not installed or not in PATH

**Solution:**
1. Download Node.js: https://nodejs.org/
2. Install LTS version
3. Restart computer
4. Try again

---

### Issue 10: Images not uploading

**Cause:** Multer middleware or uploads folder issue

**Solution:**
1. Check `backend/uploads` folder exists
2. Check `backend/middleware/upload.js` is correct
3. Check file size (max 5MB)
4. Check file type (images only)

---

## 🚀 Quick Fixes

### Restart Everything
```bash
# Stop backend (Ctrl+C in terminal)
# Then:
cd backend
npm start
```

### Reset Database
```bash
# Warning: This deletes all data!
cd backend
npm run seed
```

### Reinstall Dependencies
```bash
cd backend
rm -rf node_modules
rm package-lock.json
npm install
```

---

## ✅ How to Check if Everything is Working

### 1. Backend Health Check
Open in browser: http://localhost:5000/api/health

Expected: `{"ok":true}`

### 2. Get Articles
Open in browser: http://localhost:5000/api/articles

Expected: `[]` (empty array) or list of articles

### 3. Frontend
Open `frontend/index.html` in browser

Expected: Should show the website (may show "अभी कोई लेख नहीं" if no articles)

### 4. Admin Dashboard
Open `admin/index.html` in browser

Expected: Login page

---

## 🐛 Still Not Working?

### Check These:

1. **Backend is running?**
   - Look for terminal window with "Server: http://localhost:5000"
   - Should say "MongoDB connected"

2. **MongoDB is running?**
   - Local: Check Windows Services
   - Cloud: Check MongoDB Atlas connection string

3. **Correct folder?**
   - Make sure you're in the project folder
   - Path should end with: `jal-dhara-jaipur-feat-full-project`

4. **Dependencies installed?**
   ```bash
   cd backend
   npm install
   ```

5. **Environment variables set?**
   - Check `backend/.env` file exists
   - Should have: MONGODB_URI, JWT_SECRET, etc.

---

## 📋 System Requirements Check

Run these commands to verify:

```bash
# Check Node.js (should be v18+)
node --version

# Check npm
npm --version

# Check Git
git --version

# Check MongoDB (if local)
mongod --version
```

---

## 🆘 Emergency Reset

If nothing works, try this:

```bash
# 1. Stop all running processes (Ctrl+C)

# 2. Go to project folder
cd "c:\Users\LENOVO\Downloads\jal-dhara-jaipur-feat-full-project\jal-dhara-jaipur-feat-full-project"

# 3. Reinstall backend
cd backend
rm -rf node_modules
npm install

# 4. Reset environment
copy .env.example .env

# 5. Seed database
npm run seed

# 6. Start server
npm start

# 7. Open frontend
# Open frontend/index.html in browser
```

---

## 📞 Getting Help

If you're still stuck:

1. Check the error message in the terminal
2. Google the error message
3. Check Node.js/MongoDB documentation
4. Ask on Stack Overflow with the error details

---

## 💡 Prevention Tips

To avoid issues:

✅ Always keep backend terminal open while using the site
✅ Use `start-website.bat` to start everything
✅ Don't delete the `node_modules` folder
✅ Don't modify `.env` unless you know what you're doing
✅ Keep MongoDB running

---

**Most common fix: Just restart the backend server!** 🔄
