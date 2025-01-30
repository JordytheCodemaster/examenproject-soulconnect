const express = require('express');
const router = express.Router();
const { test } = require('../controller/test_controller');

// Route to fetch all tests
router.post('/test', test);

module.exports = router;