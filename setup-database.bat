@echo off
echo ========================================
echo Expense Tracker - Database Setup
echo ========================================
echo.
echo This script will help you set up the MySQL database.
echo.
echo Prerequisites:
echo - MySQL must be installed and running
echo - You need MySQL root password
echo.
pause

echo.
echo Please enter your MySQL root password when prompted.
echo.

mysql -u root -p < database\schema.sql

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo Database setup completed successfully!
    echo ========================================
    echo.
    echo Database: expense_tracker
    echo Tables: users, categories, expenses
    echo Sample data has been inserted.
    echo.
) else (
    echo.
    echo ========================================
    echo Error: Database setup failed!
    echo ========================================
    echo.
    echo Please check:
    echo 1. MySQL is running
    echo 2. You entered the correct password
    echo 3. MySQL bin directory is in PATH
    echo.
)

pause
