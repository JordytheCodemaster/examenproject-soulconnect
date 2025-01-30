const express = require('express');
const router = express.Router();
const { adminLogin, banUser, createPrice, unbanUser, adminRegister, updateAdmin, updateSubscriptionPrice, updatePrice, getPrices } = require('../controller/admin_controller');

router.post('/adminlogin', adminLogin);
router.post('/adminregister', adminRegister);
router.put('/admin', updateAdmin);
router.put('/subscriptions/:id/price', updateSubscriptionPrice);
router.put('/update-price', updatePrice);
router.get('/prices', getPrices); // Add the new route
router.put('/ban/:id', banUser);
router.put('/unban/:id', unbanUser);
router.post('/create', createPrice);
module.exports = router;
