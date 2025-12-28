const db = require('../config/database');

const findAll = async (filters = {}) => {
    let query = `SELECT e.id, 
            e.user_id, 
            u.name as user_name,
            e.category_id,
            c.name as category_name, 
            e.amount, 
            e.date, 
            e.description,
            e.created_at,
            e.updated_at
        FROM expenses e
        JOIN users u ON e.user_id = u.id
        JOIN categories c ON e.category_id = c.id
        WHERE 1=1
        `;

    const params = [];

    if (filters.user_id) {
        query += ' AND e.user_id = ?';
        params.push(filters.user_id);
    }

    if (filters.category_id) {
        query += ' AND e.category_id = ?';
        params.push(filters.category_id);
    }

    if (filters.start_date) {
        query += ' AND e.date >= ?';
        params.push(filters.start_date);
    }

    if (filters.end_date) {
        query += ' AND e.date <= ?';
        params.push(filters.end_date);
    }

    query += ' ORDER BY e.date DESC, e.created_at DESC';

    const [expenses] = await db.query(query, params);
    return expenses;
};

const findById = async (id) => {
    const query = `SELECT e.id,
            e.user_id, 
            u.name as user_name, 
            e.category_id,
            c.name as category_name, 
            e.amount, 
            e.date, 
            e.description,
            e.created_at,
            e.updated_at
        FROM expenses e
        JOIN users u ON e.user_id = u.id
        JOIN categories c ON e.category_id = c.id
        WHERE e.id = ?
        `;

    const [expenses] = await db.query(query, [id]);
    return expenses[0];
};

const create = async (expenseData) => {
    const { user_id, category_id, amount, date, description } = expenseData;
    const query = `INSERT INTO expenses (user_id, category_id, amount, date, description) VALUES (?, ?, ?, ?, ?)`;

    const [result] = await db.query(query, [
        user_id,
        category_id,
        amount,
        date,
        description || null
    ]);

    return findById(result.insertId);
};

const update = async (id, expenseData) => {
    const updates = [];
    const params = [];

    if (expenseData.user_id !== undefined) {
        updates.push('user_id = ?');
        params.push(expenseData.user_id);
    }

    if (expenseData.category_id !== undefined) {
        updates.push('category_id = ?');
        params.push(expenseData.category_id);
    }

    if (expenseData.amount !== undefined) {
        updates.push('amount = ?');
        params.push(expenseData.amount);
    }

    if (expenseData.date !== undefined) {
        updates.push('date = ?');
        params.push(expenseData.date);
    }

    if (expenseData.description !== undefined) {
        updates.push('description = ?');
        params.push(expenseData.description);
    }

    if (updates.length === 0) {
        return null;
    }

    params.push(id);
    const query = `UPDATE expenses SET ${updates.join(', ')} WHERE id = ?`;

    await db.query(query, params);
    return findById(id);
};

const deleteResult = async (id) => {
    const [result] = await db.query('DELETE FROM expenses WHERE id = ?', [id]);
    return result.affectedRows > 0;
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    delete: deleteResult
};
