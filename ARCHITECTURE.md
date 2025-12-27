# Expense Tracker - Project Architecture

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT TIER                              │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              React Frontend (Port 3000)                   │   │
│  │                                                            │   │
│  │  ├─ Components/                                           │   │
│  │  │  ├─ ExpenseForm.jsx    (Add new expenses)            │   │
│  │  │  ├─ FilterSection.jsx  (Filter expenses)             │   │
│  │  │  ├─ ExpenseList.jsx    (Display & edit expenses)     │   │
│  │  │  └─ Statistics.jsx     (3 analytics displays)        │   │
│  │  │                                                        │   │
│  │  ├─ State Management/                                    │   │
│  │  │  ├─ Redux (Global state - filters)                   │   │
│  │  │  └─ React Query (Server state - API data)            │   │
│  │  │                                                        │   │
│  │  └─ Services/                                            │   │
│  │     └─ api.js (Axios + React Query hooks)               │   │
│  └────────────────────────────────────────────────────────────┘   │
│                                                                   │
└───────────────────────────┬───────────────────────────────────────┘
                            │
                            │ HTTP REST API
                            │ (JSON)
                            │
┌───────────────────────────▼───────────────────────────────────────┐
│                        SERVER TIER                                 │
│                                                                    │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │            Node.js + Express (Port 5000)                  │    │
│  │                                                            │    │
│  │  ├─ Routes/                                               │    │
│  │  │  ├─ /api/expenses      (CRUD operations)             │    │
│  │  │  ├─ /api/users         (Get users)                   │    │
│  │  │  ├─ /api/categories    (Get categories)              │    │
│  │  │  └─ /api/statistics    (3 analytics endpoints)       │    │
│  │  │                                                        │    │
│  │  ├─ Controllers/                                         │    │
│  │  │  ├─ expenseController.js    (Business logic)         │    │
│  │  │  ├─ userController.js                                │    │
│  │  │  ├─ categoryController.js                            │    │
│  │  │  └─ statisticsController.js (Complex SQL queries)    │    │
│  │  │                                                        │    │
│  │  ├─ Middleware/                                          │    │
│  │  │  └─ validation.js (Express-validator)                │    │
│  │  │                                                        │    │
│  │  └─ Config/                                              │    │
│  │     └─ database.js (MySQL connection pool)              │    │
│  └────────────────────────────────────────────────────────────┘    │
│                                                                    │
└───────────────────────────┬────────────────────────────────────────┘
                            │
                            │ MySQL Driver (mysql2)
                            │ Raw SQL Queries
                            │
┌───────────────────────────▼────────────────────────────────────────┐
│                        DATA TIER                                    │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────┐     │
│  │                    MySQL Database                         │     │
│  │                   (expense_tracker)                       │     │
│  │                                                            │     │
│  │  ┌─────────────────────────────────────────────────┐     │     │
│  │  │  users                                          │     │     │
│  │  │  ├─ id (PK)                                     │     │     │
│  │  │  ├─ name                                        │     │     │
│  │  │  ├─ email (UNIQUE)                              │     │     │
│  │  │  ├─ status                                      │     │     │
│  │  │  └─ created_at                                  │     │     │
│  │  └─────────────────────────────────────────────────┘     │     │
│  │                                                            │     │
│  │  ┌─────────────────────────────────────────────────┐     │     │
│  │  │  categories                                     │     │     │
│  │  │  ├─ id (PK)                                     │     │     │
│  │  │  ├─ name (UNIQUE)                               │     │     │
│  │  │  └─ created_at                                  │     │     │
│  │  └─────────────────────────────────────────────────┘     │     │
│  │                                                            │     │
│  │  ┌─────────────────────────────────────────────────┐     │     │
│  │  │  expenses                                       │     │     │
│  │  │  ├─ id (PK)                                     │     │     │
│  │  │  ├─ user_id (FK → users.id)                    │     │     │
│  │  │  ├─ category_id (FK → categories.id)           │     │     │
│  │  │  ├─ amount (DECIMAL)                            │     │     │
│  │  │  ├─ date                                        │     │     │
│  │  │  ├─ description                                 │     │     │
│  │  │  ├─ created_at                                  │     │     │
│  │  │  └─ updated_at                                  │     │     │
│  │  └─────────────────────────────────────────────────┘     │     │
│  └────────────────────────────────────────────────────────────┘     │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. Add Expense Flow
```
User Input → ExpenseForm (Validation) → Redux (State) → 
React Query (POST) → Express Route → Validation Middleware → 
Controller → MySQL Query → Database → Response → 
React Query (Cache Update) → UI Update
```

### 2. Filter Expenses Flow
```
Filter Change → Redux (Update State) → React Query (GET with params) → 
Express Route → Controller → MySQL WHERE clause → Database → 
Response → React Query (Cache) → ExpenseList Update
```

### 3. Statistics Flow
```
Component Mount → React Query (GET) → Express Route → 
Statistics Controller → Complex SQL (Window Functions) → 
Database → Aggregated Data → Response → UI Display
```

## API Endpoints Structure

```
/api
├── /expenses
│   ├── GET    /              (Get all with filters)
│   ├── GET    /:id           (Get single)
│   ├── POST   /              (Create new)
│   ├── PUT    /:id           (Update)
│   └── DELETE /:id           (Delete)
│
├── /users
│   ├── GET    /              (Get all)
│   └── GET    /:id           (Get single)
│
├── /categories
│   ├── GET    /              (Get all)
│   └── GET    /:id           (Get single)
│
└── /statistics
    ├── GET    /top-days              (Statistic 1)
    ├── GET    /monthly-change        (Statistic 2)
    └── GET    /predict-next-month    (Statistic 3)
```

## Statistics SQL Logic

### Statistic 1: Top 3 Days by Expenditure
```sql
WITH daily_totals AS (
  -- Sum expenses per user per day
)
ranked_days AS (
  -- Rank days using ROW_NUMBER()
)
SELECT top 3 for each user
```

### Statistic 2: Monthly Percentage Change
```sql
WITH monthly_totals AS (
  -- Sum expenses per user per month
)
monthly_comparison AS (
  -- Use LAG() to get previous month
  -- Calculate percentage change
)
SELECT with comparison
```

### Statistic 3: Next Month Prediction
```sql
WITH monthly_totals AS (
  -- Get last 3 months data
)
SELECT AVG(amount) for prediction
```

## Component Hierarchy

```
App
├── ExpenseForm
│   ├── User Select (from API)
│   ├── Category Select (from API)
│   ├── Amount Input (validated)
│   ├── Date Input (validated)
│   └── Description Textarea
│
├── FilterSection
│   ├── User Filter (Redux)
│   ├── Category Filter (Redux)
│   ├── Start Date (Redux)
│   ├── End Date (Redux)
│   └── Clear Filters Button
│
├── ExpenseList
│   ├── Table Display
│   ├── Edit Mode (inline)
│   ├── Delete Action
│   └── Empty/Loading States
│
└── Statistics
    ├── TopDays Card (Statistic 1)
    ├── MonthlyChange Card (Statistic 2)
    └── Prediction Card (Statistic 3)
```

## Technology Stack Details

### Frontend
```
React 18.2.0
├── @reduxjs/toolkit (State Management)
├── @tanstack/react-query (Server State)
├── axios (HTTP Client)
└── Modern CSS (Styling)
```

### Backend
```
Node.js + Express
├── mysql2 (Database Driver)
├── express-validator (Validation)
├── cors (CORS Support)
└── dotenv (Environment Variables)
```

### Database
```
MySQL 8
├── InnoDB Engine
├── Foreign Keys
├── Indexes
└── Raw SQL (No ORM)
```

## Request/Response Examples

### Add Expense Request
```json
POST /api/expenses
{
  "user_id": 1,
  "category_id": 1,
  "amount": 50.00,
  "date": "2025-12-27",
  "description": "Grocery shopping"
}
```

### Add Expense Response
```json
{
  "success": true,
  "message": "Expense added successfully",
  "data": {
    "id": 51,
    "user_id": 1,
    "user_name": "John Doe",
    "category_id": 1,
    "category_name": "Food & Dining",
    "amount": "50.00",
    "date": "2025-12-27",
    "description": "Grocery shopping",
    "created_at": "2025-12-27T12:00:00.000Z"
  }
}
```

### Statistics Response (Top Days)
```json
{
  "success": true,
  "message": "Top 3 days by expenditure for each user",
  "data": [
    {
      "user_id": 1,
      "user_name": "John Doe",
      "top_days": [
        { "date": "2025-11-20", "amount": 800.00 },
        { "date": "2025-12-15", "amount": 600.00 },
        { "date": "2025-12-20", "amount": 490.00 }
      ]
    }
  ]
}
```

## Security Features

1. **SQL Injection Prevention**: Parameterized queries
2. **Input Validation**: Both client and server side
3. **CORS Configuration**: Controlled origins
4. **Error Handling**: No sensitive data exposure
5. **Data Type Validation**: Express-validator

## Performance Optimizations

1. **Database**: Indexes on foreign keys and date columns
2. **Frontend**: React Query caching
3. **Backend**: Connection pooling
4. **API**: Efficient SQL queries with proper joins
5. **UI**: Loading states and lazy rendering
