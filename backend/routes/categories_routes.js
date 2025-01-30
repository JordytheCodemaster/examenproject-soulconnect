const express = require('express');
const router = express.Router();
const { getCategories, getUsersWithCategories, getUserWithCategories, updateUserCategories, getUserCategories, getUserCategoriesWithTypes, createUserCategories, updateUserCategory } = require('../controller/categories_controller');


router.get('/categories', getCategories);
router.get('/users/categories', getUsersWithCategories);
router.get('/user/:id/categories', getUserWithCategories);
router.put('/users/categories', updateUserCategories);
router.get('/users/categories', getUserCategories);
router.get('/users/categories/types', getUserCategoriesWithTypes);
router.post('/users/categories', createUserCategories);
router.put('/users/:id/categories/:category_id', updateUserCategory);
module.exports = router;