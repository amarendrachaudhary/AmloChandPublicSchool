@echo off
REM ============================================
REM School Management System - Database Setup
REM ============================================

echo.
echo ========================================
echo School Management Database Setup
echo ========================================
echo.

REM Check if PostgreSQL is installed
where psql >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: PostgreSQL is not installed or not in PATH!
    echo.
    echo Please install PostgreSQL from: https://www.postgresql.org/download/windows/
    echo.
    pause
    exit /b 1
)

echo PostgreSQL found!
echo.

REM Get PostgreSQL credentials
set /p PGUSER="Enter PostgreSQL username (default: postgres): "
if "%PGUSER%"=="" set PGUSER=postgres

echo.
echo Enter PostgreSQL password for user '%PGUSER%':
set /p PGPASSWORD=

REM Set environment variable for password
set PGPASSWORD=%PGPASSWORD%

echo.
echo ========================================
echo Creating Database...
echo ========================================
echo.

REM Create database
psql -U %PGUSER% -c "DROP DATABASE IF EXISTS school_management;"
psql -U %PGUSER% -c "CREATE DATABASE school_management;"

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: Failed to create database!
    echo Please check your credentials and try again.
    echo.
    pause
    exit /b 1
)

echo Database 'school_management' created successfully!
echo.

echo ========================================
echo Setting up tables and data...
echo ========================================
echo.

REM Run the SQL setup file
psql -U %PGUSER% -d school_management -f backend\database_setup.sql

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: Failed to setup tables!
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo Database Setup Complete!
echo ========================================
echo.
echo Database Name: school_management
echo Tables Created: 8
echo - admins
echo - notices
echo - events
echo - gallery_images
echo - download_files
echo - fee_structure
echo - student_results
echo - about_section
echo.
echo Default Admin Credentials:
echo Username: admin
echo Password: admin123
echo.
echo Next Steps:
echo 1. Update backend/.env file with your database credentials
echo 2. Run: cd backend
echo 3. Run: python app.py
echo.
echo ========================================
echo.

pause
