@echo off
setlocal EnableDelayedExpansion

echo ========================================
echo  Quick GitHub Push
echo ========================================
echo.

:: Check Git installation
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Git is not installed!
    echo.
    echo Download from: https://git-scm.com/download/win
    echo After installing, run this script again.
    pause
    exit /b 1
)

echo Git is installed! ✓
echo.

:: Configure Git if needed
echo Configuring Git...
git config --global user.name "jaysxaena11" 2>nul
git config --global user.email "jaysxaena11@github.com" 2>nul

:: Initialize repository
if not exist ".git" (
    echo Initializing Git repository...
    git init
    echo ✓ Git initialized
)

:: Add all files
echo.
echo Adding files...
git add .
echo ✓ Files added

:: Commit
echo.
echo Committing files...
git commit -m "Initial commit: Jal Dhara Rajasthan multilingual blog platform" 2>nul
if %errorlevel% equ 0 (
    echo ✓ Files committed
) else (
    echo Note: Files already committed or no changes
)

:: Setup remote
echo.
echo Setting up remote repository...
git remote remove origin 2>nul
git remote add origin https://github.com/jaysxaena11/jaldhara-rajsthan.git
echo ✓ Remote configured

:: Push
echo.
echo ========================================
echo  Pushing to GitHub...
echo ========================================
echo.
echo Enter your Personal Access Token when prompted for password.
echo (The token you just generated)
echo.
pause

git branch -M main
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo  ✓ SUCCESS!
    echo ========================================
    echo.
    echo Your project is now on GitHub!
    echo View it at: https://github.com/jaysxaena11/jaldhara-rajsthan
    echo.
    echo Next steps:
    echo 1. Visit your repository
    echo 2. Deploy to production (see DEPLOYMENT.md)
    echo.
) else (
    echo.
    echo ========================================
    echo  Push Failed
    echo ========================================
    echo.
    echo Please try again and ensure:
    echo 1. You enter the correct token as password
    echo 2. Token has 'repo' permissions
    echo 3. Internet connection is working
    echo.
)

echo Press any key to exit...
pause >nul
