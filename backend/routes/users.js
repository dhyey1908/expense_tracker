const express = require('express');
const router = express.Router();
const { getUsers, getUserById } = require('../controllers/userController');

// Get all users
router.get('/', getUsers);

// Get single user by ID
router.get('/:id', getUserById);

module.exports = router;
