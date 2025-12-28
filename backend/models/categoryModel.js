const db = require('../config/database');

const findAll = async () => {
    const query = `SELECT id, name, created_at FROM categories ORDER BY name ASC`;
    const [categories] = await db.query(query);
    return categories;
};

const findById = async (id) => {
    const query = `SELECT id, name, created_at FROM categories WHERE id = ?`;
    const [categories] = await db.query(query, [id]);
    return categories[0];
};

module.exports = {
    findAll,
    findById
};
