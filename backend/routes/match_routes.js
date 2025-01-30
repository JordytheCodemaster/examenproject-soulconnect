const express = require('express');
const router = express.Router();
const { getAllMatches } = require('../controller/match_controller');

router.get('/', getAllMatches);


module.exports = router;