const db = require('../config/database');

// Statistic 1: Find each user's top 3 days by total expenditure
const getTopDaysByUser = async (req, res) => {
  try {
    const query = `
      WITH daily_totals AS (
        SELECT 
          u.id as user_id,
          u.name as user_name,
          e.date,
          SUM(e.amount) as daily_total
        FROM users u
        LEFT JOIN expenses e ON u.id = e.user_id
        WHERE e.id IS NOT NULL
        GROUP BY u.id, u.name, e.date
      ),
      ranked_days AS (
        SELECT 
          user_id,
          user_name,
          date,
          daily_total,
          ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY daily_total DESC, date DESC) as rank_num
        FROM daily_totals
      )
      SELECT 
        user_id,
        user_name,
        date,
        daily_total as amount
      FROM ranked_days
      WHERE rank_num <= 3
      ORDER BY user_id, rank_num;
    `;

    const [results] = await db.query(query);

    const groupedResults = {};
    results.forEach(row => {
      if (!groupedResults[row.user_id]) {
        groupedResults[row.user_id] = {
          user_id: row.user_id,
          user_name: row.user_name,
          top_days: []
        };
      }
      groupedResults[row.user_id].top_days.push({
        date: row.date,
        amount: parseFloat(row.amount)
      });
    });

    res.status(200).json({
      success: true,
      message: 'Top 3 days by expenditure for each user',
      data: Object.values(groupedResults)
    });
  } catch (error) {
    console.error('Error fetching top days statistics:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching top days statistics',
      error: error.message
    });
  }
};

// Statistic 2: Calculate percentage change in total expenditure from previous month
const getMonthlyChange = async (req, res) => {
  try {
    const query = `
      WITH monthly_totals AS (
        SELECT 
          u.id as user_id,
          u.name as user_name,
          DATE_FORMAT(e.date, '%Y-%m') as month,
          SUM(e.amount) as monthly_total
        FROM users u
        LEFT JOIN expenses e ON u.id = e.user_id
        WHERE e.id IS NOT NULL
        GROUP BY u.id, u.name, DATE_FORMAT(e.date, '%Y-%m')
      ),
      monthly_comparison AS (
        SELECT 
          user_id,
          user_name,
          month,
          monthly_total,
          LAG(monthly_total) OVER (PARTITION BY user_id ORDER BY month) as prev_month_total
        FROM monthly_totals
      )
      SELECT 
        user_id,
        user_name,
        month as current_month,
        DATE_FORMAT(DATE_SUB(CONCAT(month, '-01'), INTERVAL 1 MONTH), '%Y-%m') as previous_month,
        prev_month_total as previous_amount,
        monthly_total as current_amount,
        CASE 
          WHEN prev_month_total IS NULL THEN NULL
          WHEN prev_month_total = 0 THEN 100
          ELSE ROUND(((monthly_total - prev_month_total) / prev_month_total) * 100, 2)
        END as percentage_change
      FROM monthly_comparison
      WHERE prev_month_total IS NOT NULL
      ORDER BY user_id, month DESC;
    `;

    const [results] = await db.query(query);

    res.status(200).json({
      success: true,
      message: 'Percentage change in expenditure from previous month',
      data: results.map(row => ({
        user_id: row.user_id,
        user_name: row.user_name,
        current_month: row.current_month,
        previous_month: row.previous_month,
        previous_amount: parseFloat(row.previous_amount || 0),
        current_amount: parseFloat(row.current_amount || 0),
        percentage_change: row.percentage_change
      }))
    });
  } catch (error) {
    console.error('Error fetching monthly change statistics:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching monthly change statistics',
      error: error.message
    });
  }
};

// Statistic 3: Predict next month's total expenditure based on average of last 3 months
const predictNextMonth = async (req, res) => {
  try {
    const query = `
      WITH monthly_totals AS (
        SELECT 
          u.id as user_id,
          u.name as user_name,
          DATE_FORMAT(e.date, '%Y-%m') as month,
          SUM(e.amount) as monthly_total
        FROM users u
        LEFT JOIN expenses e ON u.id = e.user_id
        WHERE e.id IS NOT NULL
          AND e.date >= DATE_SUB(CURDATE(), INTERVAL 3 MONTH)
        GROUP BY u.id, u.name, DATE_FORMAT(e.date, '%Y-%m')
      ),
      latest_months AS (
        SELECT 
          user_id,
          user_name,
          month,
          monthly_total,
          ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY month DESC) as month_rank
        FROM monthly_totals
      ),
      last_3_months AS (
        SELECT 
          user_id,
          user_name,
          month,
          monthly_total
        FROM latest_months
        WHERE month_rank <= 3
      )
      SELECT 
        user_id,
        user_name,
        COUNT(DISTINCT month) as months_count,
        GROUP_CONCAT(CONCAT(month, ': ₹', ROUND(monthly_total, 2)) ORDER BY month DESC SEPARATOR ', ') as last_months_data,
        ROUND(AVG(monthly_total), 2) as predicted_amount
      FROM last_3_months
      GROUP BY user_id, user_name
      HAVING months_count >= 1
      ORDER BY user_id;
    `;

    const [results] = await db.query(query);

    const currentDate = new Date();
    const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    const nextMonthStr = nextMonth.toISOString().substring(0, 7);

    res.status(200).json({
      success: true,
      message: 'Next month expenditure prediction based on last 3 months average',
      data: results.map(row => ({
        user_id: row.user_id,
        user_name: row.user_name,
        next_month: nextMonthStr,
        months_analyzed: row.months_count,
        last_months_data: row.last_months_data,
        predicted_amount: parseFloat(row.predicted_amount)
      }))
    });
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
