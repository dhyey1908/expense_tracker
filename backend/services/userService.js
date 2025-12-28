const userModel = require('../models/userModel');

const getAllUsers = async () => {
    const users = await userModel.findAll();
    return {
        status: 200,
        success: true,
        count: users.length,
        data: users
    };
};

const getUserById = async (id) => {
    const user = await userModel.findById(id);
    if (!user) {
        return {
            status: 404,
            success: false,
            message: 'User not found'
        };
    }
    return {
        status: 200,
        success: true,
        data: user
    };
};

module.exports = {
    getAllUsers,
    getUserById
};
