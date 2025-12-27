const express = require('express');
const router = express.Router();
const {
    getTopDaysByUser,
    getMonthlyChange,
    predictNextMonth
} = require('../controllers/statisticsController');

router.get('/top-days', getTopDaysByUser);
router.get('/monthly-change', getMonthlyChange);
router.get('/predict-next-month', predictNextMonth);

module.exports = router;
