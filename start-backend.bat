@echo off
echo ========================================
echo Starting Expense Tracker Backend
echo ========================================
echo.

cd backend

if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    echo.
)

echo Starting backend server on http://localhost:5000
echo.
echo Press Ctrl+C to stop the server
echo.

call npm start
