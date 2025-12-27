const express = require('express');
const router = express.Router();
const {
    getExpenses,
    getExpenseById,
    addExpense,
    updateExpense,
    deleteExpense
} = require('../controllers/expenseController');
const { expenseValidationRules, updateExpenseValidationRules } = require('../utils/validators');
const { validate } = require('../middleware/validation');

// Get all expenses (with optional filters)
router.get('/', getExpenses);

// Get single expense by ID
router.get('/:id', getExpenseById);

// Add new expense
router.post('/', expenseValidationRules(), validate, addExpense);

// Update expense
router.put('/:id', updateExpenseValidationRules(), validate, updateExpense);

// Delete expense
router.delete('/:id', deleteExpense);

module.exports = router;
