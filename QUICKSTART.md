# 🚀 Expense Tracker - Quick Start Guide

## ⚡ Super Quick Setup (3 Steps - 5 Minutes)

### Step 1: Setup Database (2 minutes)

**Option A: Using the Batch Script (Easiest - Windows)**
```bash
# Double-click this file in Windows Explorer
setup-database.bat

# Or run from command line
.\setup-database.bat
```

**Option B: Manual Setup**
```bash
# Open MySQL command line and run:
mysql -u root -p
# Enter your password, then:
source f:\petpooja\database\schema.sql;
```

### Step 2: Start Backend (1 minute)

**Option A: Using Batch Script**
```bash
# Double-click this file
start-backend.bat
```

**Option B: Manual**
```bash
cd f:\petpooja\backend
# Update MySQL password in config/database.js first!
npm start
```

✅ Backend should start on **http://localhost:5000**

### Step 3: Start Frontend (1 minute)

**Open a NEW terminal/command prompt**

**Option A: Using Batch Script**
```bash
# Double-click this file
start-frontend.bat
```

**Option B: Manual**
```bash
cd f:\petpooja\frontend
npm start
```

✅ Frontend will open automatically on **http://localhost:3000**

---

## 🎯 What You Can Do Now

### 1️⃣ Add Your First Expense
- Select a user (e.g., John Doe)
- Choose a category (e.g., Food & Dining)
- Enter amount: $25.50
- Pick today's date
- Click "Add Expense"

### 2️⃣ Try Filtering
- Filter by User: Select "Jane Smith"
- Filter by Category: Select "Shopping"
- Filter by Date Range: Last 30 days
- Click "Clear All Filters" to reset

### 3️⃣ Edit or Delete
- Click "Edit" on any expense
- Modify amount, date, or description
- Click "Save" or "Cancel"
- Click "Delete" to remove

### 4️⃣ View Statistics
Scroll down to see three analytics:
- 📅 **Top 3 Spending Days** - Highest spending days per user
- 📊 **Monthly Change** - % change from previous month
- 🔮 **Next Month Prediction** - Predicted spending based on averages

---

## 📸 Take Screenshots for Submission

1. Scroll to Statistics section
2. Press **Win + Shift + S** (Windows Snipping Tool)
3. Capture each statistic card
4. Save as:
   - `screenshots/statistic1.png`
   - `screenshots/statistic2.png`
   - `screenshots/statistic3.png`

---

## 🔧 Important Configuration

### Before running backend, update MySQL credentials:

File: `backend/config/database.js`

```javascript
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',           // ⚠️ Change to your MySQL username
  password: '',           // ⚠️ Change to your MySQL password
  database: 'expense_tracker',
  // ... rest stays the same
});
```

---

## ❌ Common Issues & Quick Fixes

### Issue: "Error connecting to MySQL database"
**Fix**: 
1. Check MySQL is running
2. Update password in `backend/config/database.js`
3. Verify database exists: `SHOW DATABASES;`

### Issue: "Port 5000 already in use"
**Fix**:
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Issue: "Port 3000 already in use"
**Fix**: Type 'Y' when prompted to use a different port

### Issue: "MySQL not found"
**Fix**: Add MySQL to PATH or use full path in batch script

---

## 📁 Project Structure at a Glance

```
expense-tracker/
├── 📂 backend/          → Node.js API
├── 📂 frontend/         → React App
├── 📂 database/         → SQL Schema
├── 📂 screenshots/      → Place statistics screenshots here
├── 📄 README.md
├── 📄 SETUP_GUIDE.md
├── 📄 ARCHITECTURE.md
└── 🚀 start-*.bat      → Quick start scripts
```

---

## ✅ Verification Checklist

After setup, verify:

- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] Database has 5 users
- [ ] Database has 10 categories  
- [ ] Database has sample expenses
- [ ] Can add new expense
- [ ] Can filter expenses
- [ ] Can edit/delete expenses
- [ ] All 3 statistics are showing data

---

## 🎓 Features Overview

| Feature | Status |
|---------|--------|
| Add Expenses | ✅ |
| Edit Expenses | ✅ |
| Delete Expenses | ✅ |
| Filter by User | ✅ |
| Filter by Category | ✅ |
| Filter by Date Range | ✅ |
| Top 3 Days Statistics | ✅ |
| Monthly Change Statistics | ✅ |
| Prediction Statistics | ✅ |
| Client-side Validation | ✅ |
| Server-side Validation | ✅ |
| Redux State Management | ✅ |
| React Query Data Fetching | ✅ |
| Beautiful UI/UX | ✅ |
| Responsive Design | ✅ |

---

## 📚 Additional Documentation

- **README.md** - Complete project overview
- **SETUP_GUIDE.md** - Detailed setup instructions
- **ARCHITECTURE.md** - Technical architecture details
- **SUBMISSION.md** - Assignment completion summary

---

## 🆘 Need Help?

1. Check **SETUP_GUIDE.md** for detailed troubleshooting
2. Verify all prerequisites are installed
3. Ensure MySQL credentials are correct
4. Check both servers are running

---

## 🎉 You're All Set!

The application is now ready to use. Enjoy tracking your expenses! 💰

**Note**: This is a demo application with sample data. In production, you would add authentication, more security features, and deploy to a server.

---

**Built with:** React • Redux • Node.js • Express • MySQL  
**Assignment:** MERN Stack Expense Tracker - December 2025
