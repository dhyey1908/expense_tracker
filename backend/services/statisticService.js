const statisticModel = require('../models/statisticModel');

const getTopDaysByUser = async () => {
    const results = await statisticModel.getTopDays();

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

    return {
        status: 200,
        success: true,
        message: 'Top 3 days by expenditure for each user',
        data: Object.values(groupedResults)
    };
};

const getMonthlyChange = async () => {
    const results = await statisticModel.getMonthlyTotals();

    const data = results.map(row => {
        const prev = parseFloat(row.previous_amount || 0);
        const curr = parseFloat(row.current_amount || 0);
        let percentage_change = null;

        if (prev === 0) {
            percentage_change = 100;
        } else {
            percentage_change = ((curr - prev) / prev) * 100;
        }

        return {
            user_id: row.user_id,
            user_name: row.user_name,
            current_month: row.current_month,
            previous_month: row.previous_month,
            previous_amount: prev,
            current_amount: curr,
            percentage_change: parseFloat(percentage_change.toFixed(2))
        };
    });

    return {
        status: 200,
        success: true,
        message: 'Percentage change in expenditure from previous month',
        data: data
    };
};

const predictNextMonth = async () => {
    const results = await statisticModel.getLast3MonthsData();

    const data = results.map(row => {
        const [year, month] = row.latest_month.split('-').map(Number);
        const nextMonthDate = new Date(year, month, 1);
        const monthStr = String(nextMonthDate.getMonth() + 1).padStart(2, '0');
        const nextMonthStr = `${nextMonthDate.getFullYear()}-${monthStr}`;

        return {
            user_id: row.user_id,
            user_name: row.user_name,
            next_month: nextMonthStr,
            months_analyzed: row.months_count,
            last_months_data: row.last_months_data,
            predicted_amount: parseFloat(row.predicted_amount)
        };
    });

    return {
        status: 200,
        success: true,
        message: 'Next month expenditure prediction based on last 3 months average',
        data: data
    };
};

module.exports = {
    getTopDaysByUser,
    getMonthlyChange,
    predictNextMonth
};
