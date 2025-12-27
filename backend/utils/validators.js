const { body } = require('express-validator');

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
            .isInt({ min: 1 })
            .withMessage('Amount must be a positive number greater than 0'),

        body('date')
            .notEmpty()
            .withMessage('Date is required')
            .isDate()
            .withMessage('Invalid date format')
            .custom((value) => {
                const inputDate = new Date(value);
                const today = new Date();
                if (inputDate.toISOString().split('T')[0] > today.toISOString().split('T')[0]) {
                    throw new Error('Date cannot be in the future');
                }
                return true;
            }),

        body('description')
            .optional()
            .isLength({ max: 500 })
            .withMessage('Description cannot exceed 500 characters')
    ];
};

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
            .isInt({ min: 1 })
            .withMessage('Amount must be a positive number greater than 0'),

        body('date')
            .optional()
            .isDate()
            .withMessage('Invalid date format')
            .custom((value) => {
                const inputDate = new Date(value);
                const today = new Date();
                if (inputDate.toISOString().split('T')[0] > today.toISOString().split('T')[0]) {
                    throw new Error('Date cannot be in the future');
                }
                return true;
            }),

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
