@echo off
echo ========================================
echo Starting Expense Tracker Frontend
echo ========================================
echo.

cd frontend

if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    echo.
)

echo Starting frontend on http://localhost:3000
echo.
echo The application will open in your browser automatically.
echo Press Ctrl+C to stop the server
echo.

call npm start
