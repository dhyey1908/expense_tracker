const db = require('../config/database');

// Get all users
const getUsers = async (req, res) => {
    try {
        const query = `
      SELECT 
        id, 
        name, 
        email, 
        status, 
        created_at
      FROM users 
      ORDER BY name ASC
    `;

        const [users] = await db.query(query);

        res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching users',
            error: error.message
        });
    }
};

// Get user by ID
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const query = `
      SELECT 
        id, 
        name, 
        email, 
        status, 
        created_at
      FROM users 
      WHERE id = ?
    `;

        const [users] = await db.query(query, [id]);

        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            data: users[0]
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching user',
            error: error.message
        });
    }
};

module.exports = {
    getUsers,
    getUserById
};
