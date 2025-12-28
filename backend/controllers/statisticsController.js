const statisticService = require('../services/statisticService');

// Statistic 1: Find each user's top 3 days (by total expenditure), ordered by the total amount spent.
const getTopDaysByUser = async (req, res) => {
  try {
    const result = await statisticService.getTopDaysByUser();
    res.status(result.status).json(result);
  } catch (error) {
    console.error('Error fetching top days statistics:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching top days statistics',
      error: error.message
    });
  }
};

// Statistic 2: Calculate the percentage change in total expenditure from the previous month for each user.
const getMonthlyChange = async (req, res) => {
  try {
    const result = await statisticService.getMonthlyChange();
    res.status(result.status).json(result);
  } catch (error) {
    console.error('Error fetching monthly change statistics:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching monthly change statistics',
      error: error.message
    });
  }
};

// Statistic 3: Predict the next month's total expenditure based on the average spending of the last 3 months
const predictNextMonth = async (req, res) => {
  try {
    const result = await statisticService.predictNextMonth();
    res.status(result.status).json(result);
  } catch (error) {
    console.error('Error fetching prediction statistics:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching prediction statistics',
      error: error.message
    });
  }
};

module.exports = {
  getTopDaysByUser,
  getMonthlyChange,
  predictNextMonth
};
