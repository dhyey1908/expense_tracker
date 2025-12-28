const db = require('../config/database');

const findAll = async () => {
    const query = `SELECT id, name, email, status, created_at FROM users ORDER BY name ASC`;
    const [users] = await db.query(query);
    return users;
};

const findById = async (id) => {
    const query = `SELECT id, name, email, status, created_at FROM users WHERE id = ?`;
    const [users] = await db.query(query, [id]);
    return users[0];
};

module.exports = {
    findAll,
    findById
};
