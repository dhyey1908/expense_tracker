const expenseService = require('../services/expenseService');

const getExpenses = async (req, res) => {
    try {
        const filters = {
            user_id: req.query.user_id,
            category_id: req.query.category_id,
            start_date: req.query.start_date,
            end_date: req.query.end_date
        };

        const result = await expenseService.getAllExpenses(filters);
        res.status(result.status).json(result);
    } catch (error) {
        console.error('Error fetching expenses:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching expenses',
            error: error.message
        });
    }
};

const getExpenseById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await expenseService.getExpenseById(id);
        res.status(result.status).json(result);
    } catch (error) {
        console.error('Error fetching expense:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching expense',
            error: error.message
        });
    }
};

const addExpense = async (req, res) => {
    try {
        const expenseData = {
            user_id: req.body.user_id,
            category_id: req.body.category_id,
            amount: req.body.amount,
            date: req.body.date,
            description: req.body.description
        };

        const result = await expenseService.createExpense(expenseData);
        res.status(result.status).json(result);
    } catch (error) {
        console.error('Error adding expense:', error);
        res.status(500).json({
            success: false,
            message: 'Error adding expense',
            error: error.message
        });
    }
};

const updateExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const expenseData = req.body;

        if (Object.keys(expenseData).length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No fields to update'
            });
        }

        const result = await expenseService.updateExpense(id, expenseData);
        res.status(result.status).json(result);
    } catch (error) {
        console.error('Error updating expense:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating expense',
            error: error.message
        });
    }
};

const deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await expenseService.deleteExpense(id);
        res.status(result.status).json(result);
    } catch (error) {
        console.error('Error deleting expense:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting expense',
            error: error.message
        });
    }
};

module.exports = {
    getExpenses,
    getExpenseById,
    addExpense,
    updateExpense,
    deleteExpense
};
