@echo off
echo ========================================
echo  Secure GitHub Push
echo ========================================
echo.
echo SECURITY REMINDER:
echo - NEVER share your token publicly
echo - NEVER commit your token to git
echo - Keep your token private
echo.

:: Check if git is installed
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Git is not installed!
    echo Download from: https://git-scm.com/download/win
    pause
    exit /b 1
)

echo Git is installed! ✓
echo.

:: Initialize git
if not exist ".git" (
    echo Initializing Git repository...
    git init
)

:: Configure Git (if needed)
git config user.name >nul 2>&1
if %errorlevel% neq 0 (
    set /p GIT_NAME="Enter your name: "
    git config --global user.name "%GIT_NAME%"
)

git config user.email >nul 2>&1
if %errorlevel% neq 0 (
    set /p GIT_EMAIL="Enter your email: "
    git config --global user.email "%GIT_EMAIL%"
)

echo.
echo Adding files...
git add .

echo.
echo Committing files...
git commit -m "Initial commit: Jal Dhara Rajasthan multilingual blog platform"

echo.
echo Setting up remote...
git remote remove origin 2>nul
git remote add origin https://github.com/jaysxaena11/jaldhara-rajsthan.git

echo.
echo ========================================
echo  Ready to Push
echo ========================================
echo.
echo You will be prompted for credentials:
echo - Username: jaysxaena11
echo - Password: Paste your NEW Personal Access Token
echo.
echo IMPORTANT: Use the NEW token after revoking the old one!
echo.
pause

git branch -M main
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo  SUCCESS! 🎉
    echo ========================================
    echo.
    echo Your project is on GitHub!
    echo Visit: https://github.com/jaysxaena11/jaldhara-rajsthan
    echo.
) else (
    echo.
    echo ========================================
    echo  PUSH FAILED
    echo ========================================
    echo.
    echo Please check:
    echo 1. Token is valid and has 'repo' scope
    echo 2. Token was revoked and regenerated
    echo 3. Internet connection is working
    echo.
)

pause
