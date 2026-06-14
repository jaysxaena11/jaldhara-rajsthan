@echo off
echo ========================================
echo  Jal Dhara Rajasthan - GitHub Deployment
echo ========================================
echo.
echo Repository: https://github.com/jaysxaena11/jaldhara-rajsthan.git
echo.

:: Check if git is installed
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Git is not installed!
    echo.
    echo Please download and install Git from:
    echo https://git-scm.com/download/win
    echo.
    echo After installing, restart this script.
    echo.
    pause
    exit /b 1
)

echo Git is installed! ✓
echo.

echo ========================================
echo Initializing Git repository...
echo ========================================
echo.

:: Initialize git if not already initialized
if not exist ".git" (
    git init
    echo Git repository initialized! ✓
) else (
    echo Git repository already exists! ✓
)

echo.
echo ========================================
echo Adding files...
echo ========================================
echo.

git add .
echo All files added! ✓

echo.
echo ========================================
echo Committing files...
echo ========================================
echo.

git commit -m "Initial commit: Jal Dhara Rajasthan multilingual blog platform"
if %errorlevel% equ 0 (
    echo Files committed! ✓
) else (
    echo Note: No changes to commit or already committed
)

echo.
echo ========================================
echo Setting up remote...
echo ========================================
echo.

:: Remove existing origin if it exists
git remote remove origin >nul 2>&1

git remote add origin https://github.com/jaysxaena11/jaldhara-rajsthan.git
echo Remote added! ✓

echo.
echo ========================================
echo Pushing to GitHub...
echo ========================================
echo.
echo NOTE: You may be asked for GitHub credentials.
echo Username: jaysxaena11
echo Password: Use your Personal Access Token (NOT your GitHub password)
echo.
echo How to get a token:
echo 1. Go to: https://github.com/settings/tokens
echo 2. Click "Generate new token (classic)"
echo 3. Select "repo" scope
echo 4. Copy the token and paste it when asked for password
echo.
pause

git branch -M main
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo SUCCESS! 🎉
    echo ========================================
    echo.
    echo Your project is now on GitHub!
    echo Visit: https://github.com/jaysxaena11/jaldhara-rajsthan
    echo.
) else (
    echo.
    echo ========================================
    echo ERROR OCCURRED!
    echo ========================================
    echo.
    echo Common issues:
    echo 1. Authentication failed - Use Personal Access Token
    echo 2. Remote already exists - Run: git remote remove origin
    echo 3. Network issues - Check your internet connection
    echo.
    echo For detailed instructions, check PUSH_TO_GITHUB.md
    echo.
)

echo.
echo Press any key to exit...
pause >nul
