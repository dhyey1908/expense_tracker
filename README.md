# Expense Tracker

Full-stack expense management application with React, Node.js, Express, and MySQL.

## Quick Start

### 1. Prerequisites
- Node.js (v14+)
- MySQL Server
- npm or yarn

### 2. Automated Setup (Recommended)

This project uses Gulp to manage tasks across different platforms (Windows/Linux).

#### Setup
1. **Install Root Dependencies**:
   ```bash
   npm install
   ```

2. **Install App Dependencies**:
   ```bash
   npm run install-all
   ```

3. **Configure Environment**:
   Create a `.env` file in the `backend` folder based on `.env.example`.
   ```bash
   cp backend/.env.example backend/.env
   # Update DB_PASSWORD in backend/.env with your MySQL password
   ```

4. **Setup Database**:
   ```bash
   npm run setup-db
   ```
   *Follow the prompts to enter your MySQL root password.*

#### Running the App
Start both frontend and backend concurrently:
```bash
npm start
```
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`


### 3. Manual Setup

If you prefer to set up manually or encounter issues with the automated scripts:

#### Database Setup
Start MySQL and run these commands:

```sql
CREATE DATABASE expense_tracker;
USE expense_tracker;

-- Run the SQL commands found in database/schema.sql
```

#### Backend Setup

```bash
cd backend
npm install
```

**Configuration**:
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   # OR on Windows Command Prompt: copy .env.example .env
   ```
2. Open `.env` and set your database credentials:
   ```properties
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password  # <--- Update this
   DB_NAME=expense_tracker
   ```

Start backend:
```bash
npm start
```

Backend runs on `http://localhost:5000`

#### Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs on `http://localhost:3000`

## API Endpoints

**Expenses**
- `GET /api/expenses` - Get expenses (filters: user_id, category_id, start_date, end_date)
- `GET /api/expenses/:id` - Get single expense
- `POST /api/expenses` - Create expense
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense

**Users**
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID

**Categories**
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category by ID

**Statistics**
- `GET /api/statistics/top-days` - Top 3 spending days per user
- `GET /api/statistics/monthly-change` - Monthly spending change %
- `GET /api/statistics/predict-next-month` - Next month prediction

## Features

- Full CRUD operations for expenses
- User and category management
- Advanced filtering (user, category, date range)
- Three statistical analytics:
  1. Top spending days per user
  2. Monthly percentage change
  3. Predictive analytics (next month forecast)
- Redux state management
- React Query for API caching
- Form validation (client + server)
- Responsive design

## Project Screenshots

### 1. Top Spending Days (Statistic 1)
![Top Days](screenshots/statistic_1.png)
_Shows the top 3 days where each user spent the most_

### 2. Monthly Change (Statistic 2)
![Monthly Change](screenshots/statistic_2.png)
_Displays percentage increase or decrease in spending compared to last month_

### 3. Next Month Prediction (Statistic 3)
![Prediction](screenshots/statistic_3.png)
_Forecasts next month's spending based on the 3-month average_

## Tech Stack

**Frontend:** React 18, Redux Toolkit, React Query, Axios
**Backend:** Node.js, Express.js
**Database:** MySQL
**Validation:** express-validator
**Styling:** Modern CSS

## Project Structure

```
petpooja/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── categoryController.js
│   │   ├── expenseController.js
│   │   ├── statisticsController.js
│   │   └── userController.js
│   ├── middleware/
│   │   └── validation.js
│   ├── routes/
│   │   ├── categories.js
│   │   ├── expenses.js
│   │   ├── statistics.js
│   │   └── users.js
│   ├── utils/
│   │   └── validators.js
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ExpenseForm.jsx
│   │   │   ├── ExpenseList.jsx
│   │   │   ├── FilterSection.jsx
│   │   │   └── Statistics.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── store/
│   │   │   ├── slices/
│   │   │   └── store.js
│   │   ├── styles/
│   │   │   └── App.css
│   │   ├── App.jsx
│   │   └── index.js
│   └── package.json
├── database/
│   └── schema.sql
└── README.md
```

## Postman Collection

Import `backend/Expense_Tracker_API.postman_collection.json` for API testing.

## Troubleshooting

**MySQL Connection Failed**
- Verify MySQL is running
- Check credentials in `backend/config/database.js`
- Ensure database exists: `CREATE DATABASE expense_tracker;`

**Port Already in Use**
- Backend uses port 5000
- Frontend uses port 3000
- Change ports if needed in configuration

**CORS Issues**
- Backend configured for `http://localhost:3000`
- Update in `server.js` if using different port

## Development

Backend runs with auto-reload:
```bash
cd backend
npm run dev
```

## Notes

- No ORM used (raw SQL queries)
- Client and server-side validation
- Foreign key constraints for data integrity
- RESTful API architecture
- Sample data included for testing

## License

Educational project
