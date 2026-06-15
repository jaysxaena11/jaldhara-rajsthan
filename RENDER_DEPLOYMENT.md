# Render पर Backend Deploy करने के Steps

## 1. Render Account बनाएं
- https://render.com पर जाएं
- GitHub से sign up करें

## 2. New Web Service बनाएं
- Dashboard में "New +" पर क्लिक करें
- "Web Service" select करें
- अपना GitHub repository connect करें
- Repository select करें: `jaldhara-rajsthan`

## 3. Configuration Settings

### Basic Settings:
- **Name**: `jal-dhara-backend` (या कोई unique name)
- **Region**: Singapore (या closest region)
- **Branch**: `main`
- **Root Directory**: `backend`
- **Runtime**: Node
- **Build Command**: `npm install`
- **Start Command**: `npm start`

### Environment Variables (बहुत जरूरी!):
Add करें Environment tab में:

```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://jaysaxena616_db_user:Jay@2005@cluster0.6p5bw1p.mongodb.net/?appName=Cluster0
JWT_SECRET=apni_strong_secret_key_yahan_dalein_minimum_32_characters
JWT_EXPIRES_IN=7d
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=apna_strong_password
ADMIN_NAME=Admin
TRANSLATE_ENGINE=libretranslate
```

## 4. Deploy करें
- "Create Web Service" button पर क्लिक करें
- Render automatically build और deploy करेगा
- 5-10 minutes में live हो जाएगा

## 5. Deployment के बाद

### Backend URL मिलेगा:
```
https://jal-dhara-backend.onrender.com
```

### Admin User Create करें:
Render dashboard में "Shell" tab खोलें और command run करें:
```bash
npm run seed
```

### Frontend में API URL Update करें:
`frontend/app.js` में:
```javascript
const API = 'https://jal-dhara-backend.onrender.com/api';
```

`admin/admin.js` में भी same update करें।

## 6. Testing
- Browser में खोलें: `https://your-app-name.onrender.com/api/health`
- Response आना चाहिए: `{"ok":true}`

## Important Notes:

1. **Free Plan Limitations**:
   - 750 hours/month free
   - 15 minutes inactivity के बाद sleep mode में जाता है
   - First request पर 50 seconds लग सकते हैं wake up होने में

2. **Security**:
   - Strong JWT_SECRET use करें (minimum 32 characters)
   - Admin password strong रखें
   - Environment variables को GitHub में commit न करें

3. **CORS Settings**:
   Backend में CORS properly configured है, but production में specific origins add कर सकते हैं

4. **MongoDB Atlas**:
   - Render के IP को MongoDB Atlas whitelist में add करें
   - या `0.0.0.0/0` allow करें (all IPs)
   - Atlas dashboard → Network Access → Add IP Address

## Frontend Deploy करने के लिए:

### Option 1: Vercel
```bash
cd frontend
npx vercel
```

### Option 2: Netlify
```bash
cd frontend
npx netlify deploy
```

### Option 3: GitHub Pages
```bash
# Repository settings में GitHub Pages enable करें
# frontend folder को root select करें
```

## Troubleshooting:

### Build Failed?
- Logs check करें Render dashboard में
- Dependencies properly install हो रहीं हैं check करें

### Database Connection Error?
- MongoDB Atlas में IP whitelist check करें
- Connection string सही है verify करें

### Environment Variables Missing?
- Render dashboard → Environment tab
- सभी required variables add हैं check करें

## Auto-Deploy Setup:
- GitHub में code push करने पर automatically deploy होगा
- `main` branch में changes होने पर
