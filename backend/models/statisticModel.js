const db = require('../config/database');

const getTopDays = async () => {
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
    return results;
};

const getMonthlyTotals = async () => {
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
        monthly_total as current_amount
      FROM monthly_comparison
      WHERE prev_month_total IS NOT NULL
      ORDER BY user_id, month DESC;
    `;
    const [results] = await db.query(query);
    return results;
};

const getLast3MonthsData = async () => {
    const query = `
      WITH monthly_totals AS (
        SELECT 
          u.id as user_id,
          u.name as user_name,
          DATE_FORMAT(e.date, '%Y-%m') as month,
          SUM(e.amount) as monthly_total
        FROM users u
        JOIN expenses e ON u.id = e.user_id
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
        MAX(month) as latest_month,
        COUNT(month) as months_count,
        GROUP_CONCAT(CONCAT(month, ': ₹', ROUND(monthly_total, 2)) ORDER BY month DESC SEPARATOR ', ') as last_months_data,
        ROUND(AVG(monthly_total), 2) as predicted_amount
      FROM last_3_months
      GROUP BY user_id, user_name
      HAVING months_count >= 3
      ORDER BY user_id;
    `;
    const [results] = await db.query(query);
    return results;
};

module.exports = {
    getTopDays,
    getMonthlyTotals,
    getLast3MonthsData
};
