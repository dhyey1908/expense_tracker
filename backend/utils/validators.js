const { body } = require('express-validator');

// Expense validation rules
const expenseValidationRules = () => {
    return [
        body('user_id')
            .notEmpty()
            .withMessage('User is required')
            .isInt({ min: 1 })
            .withMessage('Invalid user ID'),

        body('category_id')
            .notEmpty()
            .withMessage('Category is required')
            .isInt({ min: 1 })
            .withMessage('Invalid category ID'),

        body('amount')
            .notEmpty()
            .withMessage('Amount is required')
            .isFloat({ min: 0.01 })
            .withMessage('Amount must be a positive number greater than 0'),

        body('date')
            .notEmpty()
            .withMessage('Date is required')
            .isDate()
            .withMessage('Invalid date format'),

        body('description')
            .optional()
            .isLength({ max: 500 })
            .withMessage('Description cannot exceed 500 characters')
    ];
};

// Update expense validation rules
const updateExpenseValidationRules = () => {
    return [
        body('user_id')
            .optional()
            .isInt({ min: 1 })
            .withMessage('Invalid user ID'),

        body('category_id')
            .optional()
            .isInt({ min: 1 })
            .withMessage('Invalid category ID'),

        body('amount')
            .optional()
            .isFloat({ min: 0.01 })
            .withMessage('Amount must be a positive number greater than 0'),

        body('date')
            .optional()
            .isDate()
            .withMessage('Invalid date format'),

        body('description')
            .optional()
            .isLength({ max: 500 })
            .withMessage('Description cannot exceed 500 characters')
    ];
};

module.exports = {
    expenseValidationRules,
    updateExpenseValidationRules
};
