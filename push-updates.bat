@echo off
echo ========================================
echo  Pushing Updates to GitHub
echo ========================================
echo.
echo Changes to push:
echo - Updated name to: जल धारा अभियान राजस्थान
echo - Connected backend to Render
echo - Updated all frontend and admin files
echo.
pause

echo Adding all files...
git add .

echo.
echo Committing changes...
git commit -m "Update project name to जल धारा अभियान राजस्थान and connect to Render backend"

echo.
echo Pushing to GitHub...
git push

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo  SUCCESS! ✓
    echo ========================================
    echo.
    echo Changes pushed to GitHub!
    echo.
    echo Next steps:
    echo 1. Vercel will auto-deploy your changes
    echo 2. Wait 1-2 minutes for deployment
    echo 3. Visit your live site to see updates!
    echo.
) else (
    echo.
    echo ========================================
    echo  PUSH FAILED
    echo ========================================
    echo.
    echo If authentication is needed, paste your GitHub token.
    echo.
)

pause
