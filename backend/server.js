const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./config/database');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const expenseRoutes = require('./routes/expenses');
const userRoutes = require('./routes/users');
const categoryRoutes = require('./routes/categories');
const statisticsRoutes = require('./routes/statistics');

app.use('/api/expenses', expenseRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/statistics', statisticsRoutes);

app.get('/', (req, res) => {
    res.json({
        message: 'Expense Tracker API',
        version: '1.0.0',
        endpoints: {
            expenses: '/api/expenses',
            users: '/api/users',
            categories: '/api/categories',
            statistics: {
                topDays: '/api/statistics/top-days',
                monthlyChange: '/api/statistics/monthly-change',
                predictNextMonth: '/api/statistics/predict-next-month'
            }
        }
    });
});

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: err.message
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`API available at http://localhost:${PORT}`);
});
