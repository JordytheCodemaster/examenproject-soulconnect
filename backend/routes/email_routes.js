const express = require('express');
const router = express.Router();
const { sendEmail, verifyEmail } = require('../controller/email_controller');

router.post('/send', sendEmail);
router.get('/verify-email', verifyEmail);

module.exports = router;
