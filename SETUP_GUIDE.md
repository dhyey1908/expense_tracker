# Expense Tracker - Quick Setup Guide

## Prerequisites Checklist

Before starting, ensure you have:
- ✅ Node.js (v14 or higher) - [Download](https://nodejs.org/)
- ✅ MySQL (v8 or higher) - [Download](https://dev.mysql.com/downloads/mysql/)
- ✅ npm (comes with Node.js)

## Quick Start (5 Minutes Setup)

### Step 1: Database Setup (2 minutes)

1. **Start MySQL Server**
   - Open MySQL command line or MySQL Workbench

2. **Run Database Setup**
   ```bash
   # Navigate to the database folder
   cd f:\petpooja\database
   
   # Login to MySQL (enter your password when prompted)
   mysql -u root -p
   
   # Run the schema file
   source schema.sql;
   
   # Or copy-paste the contents of schema.sql into MySQL Workbench and execute
   ```

3. **Verify Database Created**
   ```sql
   USE expense_tracker;
   SHOW TABLES;  # Should show: categories, expenses, users
   SELECT COUNT(*) FROM users;  # Should return 5
   SELECT COUNT(*) FROM categories;  # Should return 10
   ```

### Step 2: Backend Setup (1.5 minutes)

```bash
# Navigate to backend folder
cd f:\petpooja\backend

# Install dependencies
npm install

# Configure database connection
# Edit backend/config/database.js and update:
#   - user: 'root' (your MySQL username)
#   - password: '' (your MySQL password)

# Start the backend server
npm start

# Server should start on http://localhost:5000
# You should see: "✅ Successfully connected to MySQL database"
```

### Step 3: Frontend Setup (1.5 minutes)

```bash
# Open a NEW terminal window
# Navigate to frontend folder
cd f:\petpooja\frontend

# Install dependencies
npm install

# Start the frontend
npm start

# Frontend will open automatically at http://localhost:3000
```

## Testing the Application

### 1. Add an Expense
- Select a user (e.g., John Doe)
- Select a category (e.g., Food & Dining)
- Enter amount (e.g., 50.00)
- Select today's date
- Add optional description
- Click "Add Expense"

### 2. Filter Expenses
- Use the filter section to filter by user, category, or date range
- Click "Clear All Filters" to reset

### 3. View Statistics
- Scroll down to see three different statistics:
  1. **Top 3 Spending Days** - Shows highest spending days for each user
  2. **Monthly Change** - Shows percentage change from previous month
    3. **Next Month Prediction** - Predicts next month's spending

### 4. Edit/Delete Expenses
- Click "Edit" button on any expense to modify it
- Click "Delete" button to remove an expense

## Troubleshooting

### MySQL Connection Issues

**Problem**: "Error connecting to MySQL database"

**Solution**:
1. Verify MySQL is running
2. Check credentials in `backend/config/database.js`
3. Ensure database `expense_tracker` exists

### Port Already in Use

**Problem**: "Port 5000 is already in use"

**Solution**:
```bash
# Windows - Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F

# Or change port in backend/server.js
```

**Problem**: "Port 3000 is already in use"

**Solution**: The prompt will ask if you want to use a different port. Type 'Y' and press Enter.

### CORS Issues

**Problem**: "CORS policy blocked"

**Solution**: Backend is already configured with CORS. Ensure:
- Backend is running on port 5000
- Frontend is running on port 3000
- Or update CORS settings in `backend/server.js`

### Module Not Found

**Problem**: "Cannot find module"

**Solution**:
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## API Testing (Optional)

You can test the API using tools like Postman or curl:

### Get All Expenses
```bash
curl http://localhost:5000/api/expenses
```

### Get Users
```bash
curl http://localhost:5000/api/users
```

### Get Categories
```bash
curl http://localhost:5000/api/categories
```

### Get Statistics
```bash
curl http://localhost:5000/api/statistics/top-days
curl http://localhost:5000/api/statistics/monthly-change
curl http://localhost:5000/api/statistics/predict-next-month
```

### Add Expense (POST)
```bash
curl -X POST http://localhost:5000/api/expenses \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": 1,
    "category_id": 1,
    "amount": 50.00,
    "date": "2025-12-27",
    "description": "Test expense"
  }'
```

## Screenshots

Take screenshots of the three statistics for submission:
1. Navigate to the Statistics section
2. Use Windows Snipping Tool (Win + Shift + S)
3. Capture each statistic card
4. Save as:
   - `screenshots/statistic1.png` - Top 3 Days
   - `screenshots/statistic2.png` - Monthly Change
   - `screenshots/statistic3.png` - Next Month Prediction

## Building for Production

### Backend
```bash
cd backend
# Backend runs directly with node
node server.js
```

### Frontend
```bash
cd frontend
npm run build
# Creates optimized build in 'build' folder
# Deploy this folder to your web server
```

## Project Features Checklist

### ✅ Frontend
- [x] React.js 18 with modern hooks
- [x] Redux Toolkit for state management
- [x] React Query for API data fetching
- [x] Add expenses with validation
- [x] Filter by user, category, date range
- [x] Edit and delete expenses
- [x] Beautiful glassmorphism UI
- [x] Responsive design
- [x] Client-side validation
- [x] Loading and error states

### ✅ Backend
- [x] Node.js + Express
- [x] RESTful API architecture
- [x] Server-side validation
- [x] CRUD operations for expenses
- [x] Three statistics endpoints
- [x] Error handling
- [x] CORS enabled

### ✅ Database
- [x] MySQL (no ORM - raw SQL)
- [x] Normalized schema
- [x] Foreign key constraints
- [x] Indexes for performance
- [x] Sample data included

### ✅ Statistics
- [x] Top 3 days by expenditure per user
- [x] Monthly percentage change
- [x] Next month prediction

## Tech Stack Summary

- **Frontend**: React 18, Redux Toolkit, React Query, Axios
- **Backend**: Node.js, Express.js
- **Database**: MySQL 8 (Raw SQL queries, no ORM)
- **Styling**: Modern CSS with gradients and animations

## Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Ensure all prerequisites are installed
3. Verify MySQL credentials in config file
4. Make sure both servers are running

## License

Created for educational purposes - MERN Stack Assignment 2025
