@echo off
echo ========================================
echo  Starting Jal Dhara Rajasthan Website
echo ========================================
echo.

echo Starting backend server...
cd backend
start "Backend Server" powershell -ExecutionPolicy Bypass -Command "npm start"

echo Waiting for server to start...
timeout /t 5 /nobreak >nul

echo.
echo Opening frontend in browser...
cd ..
start "" "frontend\index.html"

echo.
echo ========================================
echo  Website is Running!
echo ========================================
echo.
echo Backend: http://localhost:5000
echo Frontend: Opened in your browser
echo Admin: Open frontend\admin\index.html in browser
echo.
echo IMPORTANT: Keep the "Backend Server" window open!
echo Close it to stop the server.
echo.
echo Press any key to exit this window (server will keep running)
pause >nul
