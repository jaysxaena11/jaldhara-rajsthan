# 🚀 Push to Your GitHub Repository

Your GitHub Repository: **https://github.com/jaysxaena11/jaldhara-rajsthan.git**

## Step 1: Install Git

**Download Git for Windows:**
👉 https://git-scm.com/download/win

1. Click the link above
2. Download the installer (64-bit recommended)
3. Run the installer
4. Use **default settings** (just keep clicking "Next")
5. Click "Install"
6. Click "Finish"

## Step 2: Configure Git (First Time Setup)

Open **Command Prompt** or **PowerShell** and run:

```bash
git config --global user.name "jaysxaena11"
git config --global user.email "your-email@example.com"
```

Replace `your-email@example.com` with your actual email.

## Step 3: Navigate to Your Project

```bash
cd "c:\Users\LENOVO\Downloads\jal-dhara-jaipur-feat-full-project\jal-dhara-jaipur-feat-full-project"
```

## Step 4: Initialize Git and Push to GitHub

Run these commands **one by one**:

```bash
# Initialize Git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit: Jal Dhara Rajasthan multilingual blog platform"

# Add your GitHub repository
git remote add origin https://github.com/jaysxaena11/jaldhara-rajsthan.git

# Create main branch and push
git branch -M main
git push -u origin main
```

## Step 5: Authentication

When Git asks for credentials:

### Option A: Personal Access Token (Recommended)

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Note: "Jal Dhara Rajasthan Project"
4. Expiration: Choose your preference (e.g., 90 days)
5. Select scopes: ✅ Check **"repo"** (all repo permissions)
6. Click "Generate token"
7. **Copy the token** (you won't see it again!)
8. When Git asks for password, **paste the token**

### Option B: GitHub CLI (Alternative)

```bash
# Install from: https://cli.github.com/
# Then run:
gh auth login
```

Follow the prompts to authenticate.

## ✅ Verify Upload

After pushing, visit:
👉 **https://github.com/jaysxaena11/jaldhara-rajsthan**

You should see all your files there!

## 🔄 Future Updates

When you make changes:

```bash
# Add changed files
git add .

# Commit with message
git commit -m "Description of changes"

# Push to GitHub
git push
```

## 🐛 Troubleshooting

### Error: "git is not recognized"
- Make sure you installed Git
- Restart your terminal after installation
- Try opening a new Command Prompt window

### Error: "authentication failed"
- Use Personal Access Token (not your GitHub password)
- Follow Option A above to create a token

### Error: "repository already exists"
```bash
# Remove existing remote and add again
git remote remove origin
git remote add origin https://github.com/jaysxaena11/jaldhara-rajsthan.git
git push -u origin main
```

### Error: "refusing to merge unrelated histories"
```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

## 📞 Need Help?

- Git Documentation: https://git-scm.com/doc
- GitHub Help: https://docs.github.com/

---

**Good luck! Your project will be on GitHub soon! 🎉**
