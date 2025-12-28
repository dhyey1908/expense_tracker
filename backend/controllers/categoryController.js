const categoryService = require('../services/categoryService');

const getCategories = async (req, res) => {
    try {
        const result = await categoryService.getAllCategories();
        res.status(result.status).json(result);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching categories',
            error: error.message
        });
    }
};

const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await categoryService.getCategoryById(id);
        res.status(result.status).json(result);
    } catch (error) {
        console.error('Error fetching category:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching category',
            error: error.message
        });
    }
};

module.exports = {
    getCategories,
    getCategoryById
};
