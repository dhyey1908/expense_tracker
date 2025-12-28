const categoryModel = require('../models/categoryModel');

const getAllCategories = async () => {
    const categories = await categoryModel.findAll();
    return {
        status: 200,
        success: true,
        count: categories.length,
        data: categories
    };
};

const getCategoryById = async (id) => {
    const category = await categoryModel.findById(id);
    if (!category) {
        return {
            status: 404,
            success: false,
            message: 'Category not found'
        };
    }
    return {
        status: 200,
        success: true,
        data: category
    };
};

module.exports = {
    getAllCategories,
    getCategoryById
};
