const userService = require('../services/userService');

const getUsers = async (req, res) => {
    try {
        const result = await userService.getAllUsers();
        res.status(result.status).json(result);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching users',
            error: error.message
        });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await userService.getUserById(id);
        res.status(result.status).json(result);
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
