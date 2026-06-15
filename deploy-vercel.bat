@echo off
echo ========================================
echo  Deploy to Vercel
echo ========================================
echo.

:: Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Download from: https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js is installed! ✓
echo.

:: Check if Vercel CLI is installed
vercel --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Vercel CLI not found. Installing...
    npm install -g vercel
    echo ✓ Vercel CLI installed
)

echo.
echo ========================================
echo  IMPORTANT: Update API URL First!
echo ========================================
echo.
echo Before deploying, you need to:
echo 1. Deploy backend to Render first (see VERCEL_DEPLOYMENT.md)
echo 2. Update frontend/app.js with your backend URL
echo.
echo Have you done this? (Y/N)
set /p UPDATED="Enter Y to continue: "

if /i not "%UPDATED%"=="Y" (
    echo.
    echo Please follow these steps:
    echo 1. Open VERCEL_DEPLOYMENT.md
    echo 2. Deploy backend to Render
    echo 3. Update frontend/app.js with backend URL
    echo 4. Run this script again
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo  Deploying to Vercel...
echo ========================================
echo.

cd frontend

echo Logging in to Vercel...
vercel login

echo.
echo Deploying to production...
vercel --prod

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo  SUCCESS! 🎉
    echo ========================================
    echo.
    echo Your frontend is now live on Vercel!
    echo.
    echo Next steps:
    echo 1. Test your site
    echo 2. Update CORS in backend if needed
    echo 3. Share your live URL!
    echo.
) else (
    echo.
    echo ========================================
    echo  Deployment Failed
    echo ========================================
    echo.
    echo Please check:
    echo 1. You are logged in to Vercel
    echo 2. Internet connection is working
    echo 3. All files are present in frontend folder
    echo.
)

cd ..
pause
