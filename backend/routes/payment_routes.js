const express = require('express');
const router = express.Router();
const { processPayment, createSubscription, updateSubscription, cancelSubscription, getAllSubscriptions, getSubscriptionById, getAllSubscriptionsWithUserInfo, getAllPaymentsForUser } = require('../controller/payment_controller');

router.post('/process', processPayment);
router.post('/subscriptions', createSubscription);
router.put('/subscriptions/:id', updateSubscription);
router.delete('/subscriptions/:id', cancelSubscription);
router.get('/subscriptions', getAllSubscriptions);
router.get('/subscriptions/:id', getSubscriptionById);
router.get('/subscriptions', getAllSubscriptionsWithUserInfo);

module.exports = router;
