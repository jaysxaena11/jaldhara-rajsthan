# 📋 Project Information

## Project Name
**जल धारा जयपुर (Jal Dhara Jaipur)**

## Description
A Hindi-primary, multilingual content/blog platform featuring:
- 20 language support (Hindi as primary + 15 Indian languages + 4 international)
- Admin dashboard with JWT authentication
- Two-way Google Blogger synchronization
- LibreTranslate integration for translations
- MongoDB database
- RESTful API

## 🎯 Features

### Frontend (Public)
- ✅ Browse articles in multiple languages
- ✅ Search and filter articles
- ✅ Category-based navigation
- ✅ Responsive design
- ✅ Hindi-primary interface

### Admin Dashboard
- ✅ Secure login (JWT authentication)
- ✅ Create, edit, delete articles
- ✅ Rich text editor
- ✅ Image upload support
- ✅ Multi-language content management
- ✅ Google Blogger sync

### Backend API
- ✅ RESTful API architecture
- ✅ MongoDB database with Mongoose
- ✅ JWT token authentication
- ✅ File upload handling (Multer)
- ✅ Translation service integration
- ✅ Blogger API v3 integration
- ✅ CORS enabled

## 📁 Project Structure

```
jal-dhara-jaipur/
├── backend/                 # Node.js + Express backend
│   ├── config/             # Database configuration
│   ├── middleware/         # Auth & upload middleware
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── services/           # Business logic (Blogger, Translate)
│   ├── scripts/            # Utility scripts (seed admin)
│   ├── uploads/            # Uploaded files storage
│   ├── .env.example        # Environment variables template
│   ├── package.json        # Dependencies
│   └── server.js           # Main server file
│
├── frontend/               # Public website
│   ├── index.html         # Home page
│   ├── article.html       # Article detail page
│   ├── app.js             # Frontend JavaScript
│   └── styles.css         # Styles
│
├── admin/                  # Admin dashboard
│   ├── index.html         # Admin interface
│   ├── admin.js           # Admin functionality
│   └── admin.css          # Admin styles
│
├── docker-compose.yml      # LibreTranslate container
├── .gitignore             # Git ignore rules
├── README.md              # Project documentation
├── DEPLOYMENT.md          # Deployment guide
├── GITHUB_SETUP.md        # GitHub setup instructions
├── LICENSE                # MIT License
└── deploy-to-github.bat   # Auto-deploy script
```

## 🛠️ Technologies Used

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Multer** - File upload
- **node-fetch** - HTTP client
- **googleapis** - Google Blogger API

### Frontend
- **Vanilla JavaScript** - No frameworks
- **HTML5** - Markup
- **CSS3** - Styling

### Services
- **LibreTranslate** - Translation service (Docker)
- **Google Blogger API** - Blog synchronization
- **MongoDB Atlas** - Cloud database (optional)

## 🌍 Supported Languages (20)

### Primary
- **Hindi (हिन्दी)** - Default language

### Indian Languages (15)
- Rajasthani (राजस्थानी)
- Marathi (मराठी)
- Tamil (தமிழ்)
- Telugu (తెలుగు)
- Kannada (ಕನ್ನಡ)
- Malayalam (മലയാളം)
- Gujarati (ગુજરાતી)
- Punjabi (ਪੰਜਾਬੀ)
- Bengali (বাংলা)
- Odia (ଓଡ଼ିଆ)
- Assamese (অসমীয়া)
- Maithili (मैथिली)
- Sindhi (سنڌي)
- Urdu (اردو)
- Sanskrit (संस्कृतम्)

### International Languages (4)
- English
- Arabic (العربية)
- French (Français)
- Japanese (日本語)

## 📊 Database Schema

### User Model
```javascript
{
  email: String (unique),
  password: String (hashed),
  name: String,
  role: String (default: 'admin')
}
```

### Article Model
```javascript
{
  title: String,
  body: String,
  excerpt: String,
  language: String (default: 'hi'),
  status: String ('draft' | 'published'),
  bloggerPostId: String (optional),
  createdAt: Date,
  updatedAt: Date
}
```

## 🔐 Security Features

- ✅ Password hashing (bcryptjs)
- ✅ JWT token authentication
- ✅ Environment variables for secrets
- ✅ CORS protection
- ✅ Input validation
- ✅ Secure file upload

## 🚀 API Endpoints

### Public Routes
```
GET    /api/health              - Health check
GET    /api/articles            - Get all articles
GET    /api/articles/:id        - Get single article
GET    /api/articles/search     - Search articles
```

### Auth Routes
```
POST   /api/auth/login          - Admin login
```

### Protected Routes (Admin only)
```
POST   /api/articles            - Create article
PUT    /api/articles/:id        - Update article
DELETE /api/articles/:id        - Delete article
```

### Blogger Routes (Admin only)
```
GET    /api/blogger/oauth/url   - Get OAuth URL
GET    /api/blogger/oauth/callback - OAuth callback
POST   /api/blogger/sync        - Sync from Blogger
```

## 📦 Dependencies

### Production
- express: ^4.19.2
- mongoose: ^8.5.1
- jsonwebtoken: ^9.0.2
- bcryptjs: ^2.4.3
- cors: ^2.8.5
- dotenv: ^16.4.5
- multer: ^1.4.5-lts.1
- node-fetch: ^3.3.2
- googleapis: ^144.0.0

### Development
- nodemon: ^3.1.4

## 🎨 Design Philosophy

- **Hindi-First:** All UI elements prioritize Hindi
- **Minimal & Clean:** Premium, distraction-free design
- **Multilingual:** Seamless language switching
- **Responsive:** Works on all devices
- **Accessible:** Following web accessibility standards

## 📈 Future Enhancements

- [ ] User comments system
- [ ] Social media sharing
- [ ] Email notifications
- [ ] Advanced analytics
- [ ] SEO optimization
- [ ] Progressive Web App (PWA)
- [ ] Multi-user roles (editor, contributor)
- [ ] Content scheduling
- [ ] Media gallery
- [ ] Dark mode

## 🤝 Contributing

Contributions are welcome! Areas for improvement:
- UI/UX enhancements
- Performance optimization
- Additional language support
- Bug fixes
- Documentation improvements
- Test coverage

## 📞 Support

- GitHub Issues: Report bugs and request features
- Documentation: Refer to README.md and DEPLOYMENT.md
- Email: Contact the maintainer

## 📄 License

MIT License - Free to use, modify, and distribute

## 👨‍💻 Development Status

**Status:** Production Ready ✅

**Version:** 1.0.0

**Last Updated:** June 2026

---

**Made with ❤️ for the Hindi-speaking community**
