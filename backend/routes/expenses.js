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

router.get('/', getExpenses);
router.get('/:id', getExpenseById);
router.post('/', expenseValidationRules(), validate, addExpense);
router.put('/:id', updateExpenseValidationRules(), validate, updateExpense);
router.delete('/:id', deleteExpense);

module.exports = router;
