const expenseModel = require('../models/expenseModel');
const userModel = require('../models/userModel');
const categoryModel = require('../models/categoryModel');

const getAllExpenses = async (filters) => {
    const expenses = await expenseModel.findAll(filters);
    return {
        status: 200,
        success: true,
        count: expenses.length,
        data: expenses
    };
};

const getExpenseById = async (id) => {
    const expense = await expenseModel.findById(id);
    if (!expense) {
        return {
            status: 404,
            success: false,
            message: 'Expense not found'
        };
    }
    return {
        status: 200,
        success: true,
        data: expense
    };
};

const createExpense = async (data) => {
    const user = await userModel.findById(data.user_id);
    if (!user) {
        return {
            status: 404,
            success: false,
            message: 'User not found'
        };
    }

    const category = await categoryModel.findById(data.category_id);
    if (!category) {
        return {
            status: 404,
            success: false,
            message: 'Category not found'
        };
    }

    const newExpense = await expenseModel.create(data);
    return {
        status: 201,
        success: true,
        message: 'Expense added successfully',
        data: newExpense
    };
};

const updateExpense = async (id, data) => {
    const existingExpense = await expenseModel.findById(id);
    if (!existingExpense) {
        return {
            status: 404,
            success: false,
            message: 'Expense not found'
        };
    }

    if (data.user_id) {
        const user = await userModel.findById(data.user_id);
        if (!user) {
            return {
                status: 404,
                success: false,
                message: 'User not found'
            };
        }
    }

    if (data.category_id) {
        const category = await categoryModel.findById(data.category_id);
        if (!category) {
            return {
                status: 404,
                success: false,
                message: 'Category not found'
            };
        }
    }

    const updatedExpense = await expenseModel.update(id, data);
    const result = updatedExpense || existingExpense;

    return {
        status: 200,
        success: true,
        message: 'Expense updated successfully',
        data: result
    };
};

const deleteExpense = async (id) => {
    const existingExpense = await expenseModel.findById(id);
    if (!existingExpense) {
        return {
            status: 404,
            success: false,
            message: 'Expense not found'
        };
    }

    await expenseModel.delete(id);
    return {
        status: 200,
        success: true,
        message: 'Expense deleted successfully'
    };
};

module.exports = {
    getAllExpenses,
    getExpenseById,
    createExpense,
    updateExpense,
    deleteExpense
};
