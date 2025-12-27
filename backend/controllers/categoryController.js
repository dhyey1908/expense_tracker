const db = require('../config/database');

const getCategories = async (req, res) => {
    try {
        const query = `SELECT id, name, created_at FROM categories ORDER BY name ASC`;

        const [categories] = await db.query(query);

        res.status(200).json({
            success: true,
            count: categories.length,
            data: categories
        });
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

        const query = `SELECT id, name, created_at FROM categories WHERE id = ?`;

        const [categories] = await db.query(query, [id]);

        if (categories.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        res.status(200).json({
            success: true,
            data: categories[0]
        });
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
