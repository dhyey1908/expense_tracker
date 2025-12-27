const express = require('express');
const router = express.Router();
const {
    getTopDaysByUser,
    getMonthlyChange,
    predictNextMonth
} = require('../controllers/statisticsController');

// Statistic 1: Top 3 days by expenditure for each user
router.get('/top-days', getTopDaysByUser);

// Statistic 2: Percentage change from previous month
router.get('/monthly-change', getMonthlyChange);

// Statistic 3: Predict next month's expenditure
router.get('/predict-next-month', predictNextMonth);

module.exports = router;
