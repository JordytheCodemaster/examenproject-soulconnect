const express = require('express');
const router = express.Router();
const { getRandomUsersAndGiveScores } = require('../controller/alg_controller');

router.post('/randomUsersScore', getRandomUsersAndGiveScores);

module.exports = router;