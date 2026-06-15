# जल धारा अभियान राजस्थान (Jal Dhara Abhiyan Rajasthan)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-v6.0%2B-green)](https://www.mongodb.com/)

Hindi-primary, multilingual content/blog platform with an admin dashboard and two-way Google Blogger sync.

## Tech Stack
- **Backend:** Node.js + Express + MongoDB (Mongoose)
- **Frontend:** Static HTML/CSS/JS (Hindi-primary, minimal premium design)
- **Admin:** Protected dashboard (JWT auth)
- **Translation:** LibreTranslate (Docker) primary, Google Translate fallback (swappable module)
- **Blogger:** Two-way sync via Blogger API v3 (OAuth2)

## Folder Structure
```
.
├── backend/        # Express API, MongoDB, auth, translation, Blogger sync
├── frontend/       # Public site: index.html, article.html
├── admin/          # Protected admin dashboard
└── docker-compose.yml  # LibreTranslate container
```

## Setup

### 1. MongoDB
Local MongoDB must be running (default: `mongodb://localhost:27017`).

### 2. Backend
```bash
cd backend
cp .env.example .env      # edit values (JWT_SECRET, admin credentials, etc.)
npm install
npm run seed              # creates the first admin user
npm start                 # http://localhost:5000
```
Check: open http://localhost:5000/api/health -> `{"ok":true}`

### 3. Translation (LibreTranslate via Docker)
```bash
docker compose up -d
```
Runs LibreTranslate on http://localhost:5001 (matches `LIBRETRANSLATE_URL`).
To switch to Google: set `TRANSLATE_ENGINE=google` and `GOOGLE_TRANSLATE_API_KEY` in `.env`.

### 4. Frontend & Admin
Open `frontend/index.html` and `admin/index.html` in a browser (or serve them statically).
Login to admin with the seeded `ADMIN_EMAIL` / `ADMIN_PASSWORD`.

## Google Blogger Two-Way Sync
1. Create OAuth credentials in Google Cloud (Blogger API v3 enabled).
2. Put `BLOGGER_CLIENT_ID`, `BLOGGER_CLIENT_SECRET`, `BLOGGER_BLOG_ID` in `.env`.
3. As admin, GET `/api/blogger/oauth/url` -> visit URL -> consent -> callback returns a `refresh_token`.
4. Put that token in `.env` as `BLOGGER_REFRESH_TOKEN` and restart.
- New admin posts auto-publish to Blogger; updates/deletes sync via `bloggerPostId`.
- POST `/api/blogger/sync` imports existing Blogger posts.

## Languages (20)
Hindi (primary/default) + 15 Indian (Rajasthani, Marathi, Tamil, Telugu, Kannada, Malayalam, Gujarati, Punjabi, Bengali, Odia, Assamese, Maithili, Sindhi, Urdu, Sanskrit) + 4 international (English, Arabic, French, Japanese). Dates and numbers always render in English.

## Roles
- **Admin:** full CRUD + dashboard (login required; all CRUD APIs enforce admin token).
- **Visitor:** read / search / filter only.


## 🚀 Quick Start

### Prerequisites
- Node.js v18.0.0 or higher
- MongoDB v6.0 or higher
- Docker (optional, for translation service)
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/YOUR-USERNAME/jal-dhara-jaipur.git
cd jal-dhara-jaipur
```

2. **Install dependencies**
```bash
cd backend
npm install
```

3. **Configure environment**
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Seed admin user**
```bash
npm run seed
```

5. **Start the server**
```bash
npm start
```

6. **Access the application**
- Backend API: http://localhost:5000
- Frontend: Open `frontend/index.html` in your browser
- Admin Dashboard: Open `admin/index.html` in your browser

## 📝 API Documentation

### Public Endpoints
- `GET /api/articles` - Get all published articles
- `GET /api/articles/:id` - Get single article
- `GET /api/articles/search?q=query` - Search articles

### Admin Endpoints (requires JWT token)
- `POST /api/auth/login` - Admin login
- `POST /api/articles` - Create new article
- `PUT /api/articles/:id` - Update article
- `DELETE /api/articles/:id` - Delete article

## 🌐 Deployment

### Deploy to Heroku
```bash
heroku create your-app-name
heroku addons:create mongolab
git push heroku main
```

### Deploy to Vercel/Netlify
1. Deploy backend to Heroku/Railway/Render
2. Deploy frontend to Vercel/Netlify
3. Update API URLs in frontend files

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

Your Name - [@your-github-username](https://github.com/your-github-username)

## 🙏 Acknowledgments

- LibreTranslate for translation services
- Google Blogger API for blog synchronization
- MongoDB for database
- Express.js for backend framework
