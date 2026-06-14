# 📦 Quick GitHub Setup Guide

## Step-by-Step Instructions

### 1️⃣ Install Git (if not installed)

**Download Git for Windows:**
https://git-scm.com/download/win

- Download the installer
- Run the installer (use default settings)
- Restart your terminal

### 2️⃣ Create GitHub Account (if you don't have one)

Go to: https://github.com/signup

### 3️⃣ Create New Repository on GitHub

1. Login to GitHub
2. Click the **"+"** icon (top right) → **"New repository"**
3. Fill in:
   - **Repository name:** `jal-dhara-jaipur`
   - **Description:** "Hindi-primary multilingual blog platform with admin dashboard"
   - **Visibility:** Public (or Private if you prefer)
   - ⚠️ **Important:** DO NOT check "Initialize this repository with a README"
4. Click **"Create repository"**

### 4️⃣ Push Your Code to GitHub

**Open Command Prompt or PowerShell in your project folder:**

```bash
# Navigate to your project
cd "c:\Users\LENOVO\Downloads\jal-dhara-jaipur-feat-full-project\jal-dhara-jaipur-feat-full-project"

# Initialize git
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit: Jal Dhara Jaipur multilingual blog platform"

# Add your GitHub repository (REPLACE YOUR-USERNAME with your actual GitHub username)
git remote add origin https://github.com/YOUR-USERNAME/jal-dhara-jaipur.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Note:** Replace `YOUR-USERNAME` with your actual GitHub username!

### 5️⃣ First Time Git Setup

If this is your first time using Git, you'll need to configure it:

```bash
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
```

### 6️⃣ Authentication

When you push for the first time, GitHub will ask for credentials:

**Option 1: Personal Access Token (Recommended)**
1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token (classic)
3. Select scopes: `repo` (all)
4. Copy the token
5. Use the token as your password when Git asks

**Option 2: GitHub CLI**
```bash
# Install GitHub CLI from: https://cli.github.com/
gh auth login
```

## ✅ Verify Upload

After pushing, visit:
```
https://github.com/YOUR-USERNAME/jal-dhara-jaipur
```

You should see all your files there!

## 🔄 Future Updates

When you make changes to your code:

```bash
# Add changed files
git add .

# Commit with a message
git commit -m "Description of your changes"

# Push to GitHub
git push
```

## 🎉 Next Steps

1. **Share your project:** Send the GitHub link to others
2. **Deploy to production:** Follow the `DEPLOYMENT.md` guide
3. **Add collaborators:** Go to repo Settings → Collaborators

## 📞 Need Help?

- Git Documentation: https://git-scm.com/doc
- GitHub Guides: https://guides.github.com/

---

**You're all set! Your project is ready to be shared with the world! 🌍**
