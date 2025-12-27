# Expense Tracker - Submission Summary

## Assignment Completion Checklist

### ✅ Frontend (React.js)
- [x] **Dashboard with Add Expense Form**
  - User selection dropdown
  - Category selection dropdown
  - Date picker
  - Amount input with validation
  - Description textarea (optional)
  - Client-side validation with error messages
  
- [x] **Filter Expenses**
  - Filter by User
  - Filter by Category  
  - Filter by Date Range (Start Date & End Date)
  - Clear filters functionality
  
- [x] **State Management**
  - Redux Toolkit implemented
  - React Query for API data fetching
  - Filters stored in Redux state

- [x] **Modern UI/UX**
  - Glassmorphism design
  - Gradient backgrounds
  - Smooth animations
  - Responsive layout
  - Loading states
  - Empty states
  - Error handling

### ✅ Backend (Node.js + Express)

- [x] **CRUD APIs for Expenses**
  - POST /api/expenses - Add expense
  - GET /api/expenses - Get all expenses (with filters)
  - PUT /api/expenses/:id - Update expense
  - DELETE /api/expenses/:id - Delete expense
  
- [x] **Supporting APIs**
  - GET /api/users - Get all users
  - GET /api/categories - Get all categories

- [x] **Statistics APIs**
  
  **Statistic 1: Top 3 Days by Expenditure**
  - Endpoint: GET /api/statistics/top-days
  - Returns each user's top 3 days ordered by total expenditure
  - Uses complex SQL with window functions (ROW_NUMBER)
  
  **Statistic 2: Monthly Percentage Change**
  - Endpoint: GET /api/statistics/monthly-change
  - Calculates percentage change from previous month for each user
  - Uses LAG window function for comparison
  
  **Statistic 3: Next Month Prediction**
  - Endpoint: GET /api/statistics/predict-next-month
  - Predicts next month's expenditure based on last 3 months average
  - Uses AVG aggregation and date filtering

- [x] **Server-side Validation**
  - Express-validator middleware
  - Request body validation
  - Data type and range validation
  - Error response formatting

### ✅ Database (MySQL)

- [x] **Tables Created**
  ```sql
  - users (id, name, email, status, created_at)
  - categories (id, name, created_at)
  - expenses (id, user_id, category_id, amount, date, description, created_at, updated_at)
  ```

- [x] **Database Features**
  - Foreign key constraints
  - Indexes for performance
  - Sample data for 5 users
  - 10 pre-populated categories
  - 50+ sample expenses for testing statistics

- [x] **No ORM Used**
  - All queries written in raw SQL
  - Using mysql2 package directly
  - Connection pooling implemented

### ✅ Validations

**Client-side (React)**
- Required field validation
- Amount must be positive number
- Date format validation
- Real-time error messages
- Form reset on success

**Server-side (Express)**
- user_id validation (must exist)
- category_id validation (must exist)
- amount validation (positive number)
- date validation (valid date format)
- description length validation (max 500 chars)
- SQL injection prevention

### ✅ Code Quality

- **Clean Code Structure**
  - Separation of concerns
  - Controller-Route-Service pattern
  - Reusable components
  - Organized folder structure

- **Error Handling**
  - Try-catch blocks
  - User-friendly error messages
  - HTTP status codes
  - Loading states

- **Modern Practices**
  - ES6+ features
  - Async/await
  - React hooks
  - Redux Toolkit
  - React Query

## File Structure

```
expense-tracker/
├── backend/
│   ├── config/
│   │   └── database.js           # MySQL connection
│   ├── controllers/
│   │   ├── expenseController.js  # CRUD operations
│   │   ├── userController.js
│   │   ├── categoryController.js
│   │   └── statisticsController.js # 3 statistics
│   ├── middleware/
│   │   └── validation.js
│   ├── routes/
│   │   ├── expenses.js
│   │   ├── users.js
│   │   ├── categories.js
│   │   └── statistics.js
│   ├── utils/
│   │   └── validators.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── ExpenseForm.jsx
│   │   │   ├── ExpenseList.jsx
│   │   │   ├── FilterSection.jsx
│   │   │   └── Statistics.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── store/
│   │   │   ├── store.js
│   │   │   └── slices/
│   │   │       └── expenseSlice.js
│   │   ├── styles/
│   │   │   └── App.css
│   │   ├── App.jsx
│   │   └── index.js
│   ├── .gitignore
│   └── package.json
│
├── database/
│   └── schema.sql
│
├── screenshots/
│   └── README.md
│
├── README.md
├── SETUP_GUIDE.md
└── SUBMISSION.md (this file)
```

## Technologies Used

### Frontend Stack
- **React.js 18** - Modern UI library
- **Redux Toolkit** - State management
- **React Query** - Server state management
- **Axios** - HTTP client
- **Modern CSS** - Glassmorphism, gradients, animations

### Backend Stack
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **mysql2** - MySQL driver (no ORM)
- **express-validator** - Input validation
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variables

### Database
- **MySQL 8** - Relational database
- Raw SQL queries (no ORM)
- Connection pooling

## Setup Instructions

### Prerequisites
- Node.js v14+
- MySQL v8+
- npm

### Quick Setup (5 minutes)

1. **Database Setup**
   ```bash
   mysql -u root -p
   source database/schema.sql
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   # Update database credentials in config/database.js
   npm start
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm start
   ```

Detailed instructions available in `SETUP_GUIDE.md`

## API Endpoints Summary

### Expenses
- `GET /api/expenses` - Get all (with filters)
- `POST /api/expenses` - Create new
- `PUT /api/expenses/:id` - Update
- `DELETE /api/expenses/:id` - Delete

### Users & Categories
- `GET /api/users` - Get all users
- `GET /api/categories` - Get all categories

### Statistics
- `GET /api/statistics/top-days` - Top 3 spending days
- `GET /api/statistics/monthly-change` - Monthly % change
- `GET /api/statistics/predict-next-month` - Next month prediction

## Features Highlights

1. **Beautiful UI**: Modern glassmorphism design with gradients and animations
2. **Real-time Filtering**: Filter expenses by user, category, and date range
3. **Inline Editing**: Edit expenses directly in the table
4. **Advanced Statistics**: Three different analytics with complex SQL
5. **Comprehensive Validation**: Both client and server-side
6. **Error Handling**: User-friendly messages and loading states
7. **Responsive Design**: Works on desktop and mobile
8. **Clean Code**: Well-organized, commented, and maintainable

## Statistics Explanation

### 1. Top 3 Days by Expenditure
- Finds the 3 days with highest total spending for each user
- Ordered by amount (highest first)
- Uses SQL window functions (ROW_NUMBER)

### 2. Monthly Percentage Change
- Compares current month with previous month
- Shows percentage increase or decrease
- Uses LAG window function
- Displays both amounts and percentage

### 3. Next Month Prediction
- Predicts next month's spending
- Based on average of last 3 months
- Shows which months were analyzed
- Useful for budgeting

## Sample Data

The database comes pre-populated with:
- 5 Users (John Doe, Jane Smith, Mike Johnson, Sarah Williams, Tom Brown)
- 10 Categories (Food, Transportation, Shopping, etc.)
- 50+ Expenses spanning last 4 months (for meaningful statistics)

## Testing

### Manual Testing
1. Add expenses through the form
2. Filter by different criteria
3. Edit and delete expenses
4. View statistics

### API Testing
Use Postman or curl to test endpoints (examples in SETUP_GUIDE.md)

## Screenshots

Screenshots of the three statistics should be placed in the `screenshots/` folder:
- statistic1.png - Top 3 days
- statistic2.png - Monthly change
- statistic3.png - Next month prediction

**Note**: Screenshots can be taken after running the application using Windows Snipping Tool.

## Submission Checklist

- [x] Complete source code
- [x] Database schema with sample data
- [x] README with setup instructions
- [x] All required features implemented
- [x] Client and server-side validations
- [x] Three statistics with complex SQL
- [x] Redux for state management
- [x] React Query for API calls
- [x] No ORM used (raw SQL)
- [x] Clean code structure
- [ ] Screenshots of statistics (to be added after running)

## Known Credentials

**Database** (Update in `backend/config/database.js`):
- Host: localhost
- User: root
- Password: (your MySQL password)
- Database: expense_tracker

**Users in System** (Pre-populated):
- All users are active and ready to use
- No login required (as requested)

## Additional Notes

- No authentication implemented (as per requirements)
- All features are publicly accessible
- Focus is on code quality and functionality
- Modern design for better user experience
- Comprehensive error handling
- Production-ready code structure

## Contact

For any questions or clarifications, please feel free to ask!

---

**Developed with ❤️ for MERN Stack Assignment - December 2025**
