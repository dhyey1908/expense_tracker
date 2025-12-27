# Expense Tracker - MERN Stack Application

A comprehensive expense tracking application built with React.js, Node.js, Express, and MySQL.

## Features

### Frontend (React.js + Redux)
- ✅ Add expenses with user, category, date, and amount
- ✅ Filter expenses by category, user, or date range
- ✅ Responsive and modern UI with beautiful design
- ✅ Client-side validation
- ✅ Redux for state management
- ✅ React Query for API data fetching

### Backend (Node.js + Express)
- ✅ RESTful APIs for CRUD operations
- ✅ Server-side validation
- ✅ Advanced statistics endpoints:
  - **Statistic 1**: Top 3 days by total expenditure for each user
  - **Statistic 2**: Percentage change in expenditure from previous month
  - **Statistic 3**: Next month expenditure prediction (based on last 3 months average)

### Database (MySQL)
- ✅ Properly normalized schema
- ✅ Tables: Users, Categories, Expenses
- ✅ Sample data for testing

## Tech Stack

- **Frontend**: React.js 18, Redux Toolkit, React Query, Axios
- **Backend**: Node.js, Express.js
- **Database**: MySQL (without ORM - raw SQL queries)
- **Styling**: Modern CSS with glassmorphism and animations

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MySQL (v8 or higher)
- npm or yarn

## Installation & Setup

### 1. Clone/Extract the Project

```bash
cd f:\petpooja
```

### 2. Database Setup

#### a. Start MySQL Server
Make sure your MySQL server is running.

#### b. Create Database and Tables
Open MySQL command line or MySQL Workbench and run:

```sql
-- Create database
CREATE DATABASE expense_tracker;

-- Use the database
USE expense_tracker;

-- Create Users table
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  status ENUM('active', 'inactive') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Categories table
CREATE TABLE categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Expenses table
CREATE TABLE expenses (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  category_id INT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  date DATE NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- Insert sample users
INSERT INTO users (name, email, status) VALUES
('John Doe', 'john.doe@example.com', 'active'),
('Jane Smith', 'jane.smith@example.com', 'active'),
('Mike Johnson', 'mike.johnson@example.com', 'active'),
('Sarah Williams', 'sarah.williams@example.com', 'active'),
('Tom Brown', 'tom.brown@example.com', 'active');

-- Insert sample categories
INSERT INTO categories (name) VALUES
('Food & Dining'),
('Transportation'),
('Shopping'),
('Entertainment'),
('Bills & Utilities'),
('Healthcare'),
('Education'),
('Travel'),
('Personal Care'),
('Others');

-- Insert sample expenses (for testing statistics)
INSERT INTO expenses (user_id, category_id, amount, date, description) VALUES
-- John Doe - Last 3 months
(1, 1, 150.00, '2025-10-01', 'Grocery shopping'),
(1, 2, 50.00, '2025-10-01', 'Taxi fare'),
(1, 1, 200.00, '2025-10-05', 'Restaurant dinner'),
(1, 3, 500.00, '2025-10-10', 'New shoes'),
(1, 1, 100.00, '2025-10-15', 'Lunch with friends'),
(1, 2, 75.00, '2025-10-20', 'Uber rides'),
(1, 4, 120.00, '2025-10-25', 'Movie tickets'),
(1, 1, 180.00, '2025-11-01', 'Weekly groceries'),
(1, 5, 350.00, '2025-11-05', 'Electricity bill'),
(1, 1, 220.00, '2025-11-10', 'Family dinner'),
(1, 2, 60.00, '2025-11-15', 'Gas refill'),
(1, 3, 800.00, '2025-11-20', 'Black Friday shopping'),
(1, 1, 160.00, '2025-12-01', 'Grocery shopping'),
(1, 2, 45.00, '2025-12-01', 'Taxi'),
(1, 1, 250.00, '2025-12-05', 'Christmas dinner prep'),
(1, 4, 200.00, '2025-12-10', 'Concert tickets'),
(1, 3, 600.00, '2025-12-15', 'Holiday gifts'),
(1, 1, 190.00, '2025-12-20', 'Party supplies'),

-- Jane Smith - Last 3 months
(2, 1, 120.00, '2025-10-02', 'Breakfast meeting'),
(2, 6, 300.00, '2025-10-08', 'Doctor visit'),
(2, 1, 180.00, '2025-10-12', 'Lunch buffet'),
(2, 7, 450.00, '2025-10-18', 'Online course'),
(2, 1, 90.00, '2025-10-22', 'Coffee shop'),
(2, 2, 85.00, '2025-11-03', 'Metro card'),
(2, 1, 210.00, '2025-11-08', 'Dinner party'),
(2, 3, 550.00, '2025-11-12', 'New laptop accessories'),
(2, 1, 140.00, '2025-11-18', 'Brunch'),
(2, 5, 280.00, '2025-11-25', 'Internet bill'),
(2, 1, 165.00, '2025-12-02', 'Takeout orders'),
(2, 2, 95.00, '2025-12-07', 'Car maintenance'),
(2, 1, 230.00, '2025-12-12', 'Restaurant'),
(2, 4, 175.00, '2025-12-17', 'Theater show'),
(2, 3, 720.00, '2025-12-22', 'New phone'),

-- Mike Johnson - Last 3 months
(3, 8, 1500.00, '2025-10-05', 'Weekend trip'),
(3, 1, 200.00, '2025-10-10', 'Hotel dining'),
(3, 2, 100.00, '2025-10-15', 'Car rental'),
(3, 1, 150.00, '2025-10-20', 'Fast food'),
(3, 4, 90.00, '2025-10-25', 'Gaming'),
(3, 1, 220.00, '2025-11-01', 'Groceries'),
(3, 3, 900.00, '2025-11-06', 'Electronics'),
(3, 1, 180.00, '2025-11-11', 'Dining out'),
(3, 5, 420.00, '2025-11-16', 'Phone bill'),
(3, 2, 110.00, '2025-11-21', 'Gas'),
(3, 1, 190.00, '2025-12-03', 'Restaurant'),
(3, 8, 2000.00, '2025-12-08', 'Vacation booking'),
(3, 1, 240.00, '2025-12-13', 'Fine dining'),
(3, 3, 650.00, '2025-12-18', 'Clothing'),
(3, 4, 150.00, '2025-12-23', 'Entertainment');
```

### 3. Backend Setup

#### a. Navigate to backend folder and install dependencies

```bash
cd backend
npm install
```

#### b. Configure Database Connection

Edit `backend/config/database.js` and update MySQL credentials:

```javascript
host: 'localhost',
user: 'root',           // Your MySQL username
password: 'yourpassword', // Your MySQL password
database: 'expense_tracker'
```

#### c. Start the backend server

```bash
npm start
```

The backend server will start on `http://localhost:5000`

### 4. Frontend Setup

#### a. Navigate to frontend folder and install dependencies

```bash
cd ../frontend
npm install
```

#### b. Start the frontend development server

```bash
npm start
```

The frontend will start on `http://localhost:3000` and automatically open in your browser.

## API Endpoints

### Expenses
- `GET /api/expenses` - Get all expenses (with optional filters)
  - Query params: `user_id`, `category_id`, `start_date`, `end_date`
- `POST /api/expenses` - Add new expense
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense

### Users
- `GET /api/users` - Get all users

### Categories
- `GET /api/categories` - Get all categories

### Statistics
- `GET /api/statistics/top-days` - Get top 3 days by expenditure for each user
- `GET /api/statistics/monthly-change` - Get percentage change from previous month
- `GET /api/statistics/predict-next-month` - Predict next month's expenditure

## Usage

1. **Adding Expenses**: 
   - Fill in the "Add New Expense" form
   - Select user, category, date, amount, and optional description
   - Click "Add Expense"
   - Validation will ensure all required fields are filled

2. **Filtering Expenses**:
   - Use the filter section to filter by:
     - User
     - Category
     - Date Range (Start Date and End Date)
   - Click "Apply Filters" to see filtered results
   - Click "Clear Filters" to reset

3. **Viewing Statistics**:
   - Navigate to the Statistics section
   - View three different statistical analyses:
     - Top 3 spending days per user
     - Monthly expenditure percentage change
     - Next month expenditure prediction

4. **Managing Expenses**:
   - Edit: Click the edit button next to any expense
   - Delete: Click the delete button to remove an expense

## Project Structure

```
expense-tracker/
├── backend/
│   ├── config/
│   │   └── database.js       # MySQL connection configuration
│   ├── controllers/
│   │   ├── expenseController.js
│   │   ├── userController.js
│   │   ├── categoryController.js
│   │   └── statisticsController.js
│   ├── routes/
│   │   ├── expenses.js
│   │   ├── users.js
│   │   ├── categories.js
│   │   └── statistics.js
│   ├── middleware/
│   │   └── validation.js     # Input validation middleware
│   ├── utils/
│   │   └── validators.js     # Validation helpers
│   ├── server.js             # Express server setup
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ExpenseForm.jsx
│   │   │   ├── ExpenseList.jsx
│   │   │   ├── FilterSection.jsx
│   │   │   └── Statistics.jsx
│   │   ├── store/
│   │   │   ├── store.js
│   │   │   └── slices/
│   │   │       └── expenseSlice.js
│   │   ├── services/
│   │   │   └── api.js        # API service with React Query
│   │   ├── styles/
│   │   │   └── App.css
│   │   ├── App.jsx
│   │   └── index.js
│   └── package.json
│
├── database/
│   └── schema.sql            # Database schema and sample data
│
├── screenshots/              # Statistics screenshots
│   ├── statistic1.png
│   ├── statistic2.png
│   └── statistic3.png
│
└── README.md
```

## Features Implemented

### ✅ Frontend
- Modern, responsive React UI with glassmorphism design
- Redux Toolkit for global state management
- React Query for efficient API data fetching and caching
- Form validation with error messages
- Date range filtering
- Real-time expense list updates
- Beautiful statistics dashboard

### ✅ Backend
- RESTful API architecture
- Input validation middleware
- SQL injection protection
- Error handling
- CORS enabled for frontend communication
- Complex SQL queries for statistics

### ✅ Database
- Normalized database schema
- Foreign key constraints
- Proper indexing
- Sample data for testing

### ✅ Validations

#### Client-side (React)
- Required field validation
- Amount must be positive number
- Date validation
- Email format validation

#### Server-side (Express)
- Request body validation
- Data type validation
- Range validation for amounts
- SQL injection prevention

## Screenshots

Screenshots of the three statistics are available in the `screenshots/` folder:

1. **statistic1.png** - Top 3 days by expenditure for each user
2. **statistic2.png** - Monthly percentage change in expenditure
3. **statistic3.png** - Next month expenditure prediction

## Development Notes

- No ORM used - All database queries are written in raw SQL
- Input validation on both client and server side
- Responsive design that works on mobile and desktop
- Modern UI with smooth animations
- Clean code structure with separation of concerns

## Testing Credentials

Since users are manually populated in the database, you can use any of these users for testing:
- John Doe (ID: 1)
- Jane Smith (ID: 2)
- Mike Johnson (ID: 3)
- Sarah Williams (ID: 4)
- Tom Brown (ID: 5)

Categories are also pre-populated for easy testing.

## Troubleshooting

### MySQL Connection Issues
- Ensure MySQL server is running
- Verify credentials in `backend/config/database.js`
- Check if database `expense_tracker` exists

### Port Already in Use
- Backend default port: 5000
- Frontend default port: 3000
- Change ports in respective configuration files if needed

### CORS Issues
- Backend is configured to accept requests from `http://localhost:3000`
- Update CORS settings in `server.js` if using different port

## Future Enhancements

- User authentication and authorization
- Export expenses to CSV/PDF
- Budget setting and alerts
- Recurring expenses
- Multiple currency support
- Charts and graphs for better visualization

## Author

Built as a MERN Stack assignment demonstrating:
- Full-stack development skills
- Database design and SQL queries
- API design and implementation
- State management with Redux
- Modern React practices with hooks
- Form validation and error handling

## License

This project is created for educational purposes.
