const express = require('express');
const router = express.Router();
const { getCategories, getCategoryById } = require('../controllers/categoryController');

// Get all categories
router.get('/', getCategories);

// Get single category by ID
router.get('/:id', getCategoryById);

module.exports = router;
