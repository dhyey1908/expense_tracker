const db = require('../config/database');

const getExpenses = async (req, res) => {
    try {
        const { user_id, category_id, start_date, end_date } = req.query;

        let query = `
      SELECT 
        e.id, 
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

        if (user_id) {
            query += ' AND e.user_id = ?';
            params.push(user_id);
        }

        if (category_id) {
            query += ' AND e.category_id = ?';
            params.push(category_id);
        }

        if (start_date) {
            query += ' AND e.date >= ?';
            params.push(start_date);
        }

        if (end_date) {
            query += ' AND e.date <= ?';
            params.push(end_date);
        }

        query += ' ORDER BY e.date DESC, e.created_at DESC';

        const [expenses] = await db.query(query, params);

        res.status(200).json({
            success: true,
            count: expenses.length,
            data: expenses
        });
    } catch (error) {
        console.error('Error fetching expenses:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching expenses',
            error: error.message
        });
    }
};

const getExpenseById = async (req, res) => {
    try {
        const { id } = req.params;

        const query = `
      SELECT 
        e.id, 
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

        if (expenses.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Expense not found'
            });
        }

        res.status(200).json({
            success: true,
            data: expenses[0]
        });
    } catch (error) {
        console.error('Error fetching expense:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching expense',
            error: error.message
        });
    }
};

const addExpense = async (req, res) => {
    try {
        const { user_id, category_id, amount, date, description } = req.body;

        const [users] = await db.query('SELECT id FROM users WHERE id = ?', [user_id]);
        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const [categories] = await db.query('SELECT id FROM categories WHERE id = ?', [category_id]);
        if (categories.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        const query = `
      INSERT INTO expenses (user_id, category_id, amount, date, description) 
      VALUES (?, ?, ?, ?, ?)
    `;

        const [result] = await db.query(query, [
            user_id,
            category_id,
            amount,
            date,
            description || null
        ]);

        const [newExpense] = await db.query(`
      SELECT 
        e.id, 
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
    `, [result.insertId]);

        res.status(201).json({
            success: true,
            message: 'Expense added successfully',
            data: newExpense[0]
        });
    } catch (error) {
        console.error('Error adding expense:', error);
        res.status(500).json({
            success: false,
            message: 'Error adding expense',
            error: error.message
        });
    }
};

const updateExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const { user_id, category_id, amount, date, description } = req.body;

        const [existing] = await db.query('SELECT id FROM expenses WHERE id = ?', [id]);
        if (existing.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Expense not found'
            });
        }

        if (user_id) {
            const [users] = await db.query('SELECT id FROM users WHERE id = ?', [user_id]);
            if (users.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }
        }

        if (category_id) {
            const [categories] = await db.query('SELECT id FROM categories WHERE id = ?', [category_id]);
            if (categories.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Category not found'
                });
            }
        }

        const updates = [];
        const params = [];

        if (user_id !== undefined) {
            updates.push('user_id = ?');
            params.push(user_id);
        }

        if (category_id !== undefined) {
            updates.push('category_id = ?');
            params.push(category_id);
        }

        if (amount !== undefined) {
            updates.push('amount = ?');
            params.push(amount);
        }

        if (date !== undefined) {
            updates.push('date = ?');
            params.push(date);
        }

        if (description !== undefined) {
            updates.push('description = ?');
            params.push(description);
        }

        if (updates.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No fields to update'
            });
        }

        params.push(id);
        const query = `UPDATE expenses SET ${updates.join(', ')} WHERE id = ?`;

        await db.query(query, params);

        const [updatedExpense] = await db.query(`
      SELECT 
        e.id, 
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
    `, [id]);

        res.status(200).json({
            success: true,
            message: 'Expense updated successfully',
            data: updatedExpense[0]
        });
    } catch (error) {
        console.error('Error updating expense:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating expense',
            error: error.message
        });
    }
};

const deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;

        const [existing] = await db.query('SELECT id FROM expenses WHERE id = ?', [id]);
        if (existing.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Expense not found'
            });
        }

        await db.query('DELETE FROM expenses WHERE id = ?', [id]);

        res.status(200).json({
            success: true,
            message: 'Expense deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting expense:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting expense',
            error: error.message
        });
    }
};

module.exports = {
    getExpenses,
    getExpenseById,
    addExpense,
    updateExpense,
    deleteExpense
};
