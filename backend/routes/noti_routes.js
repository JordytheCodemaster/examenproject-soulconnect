const express = require('express');
const router = express.Router();
const { getNotifications, createNotification, deleteNotification } = require('../controller/noti_controller');

router.get('/', getNotifications);
router.post('/', createNotification);
router.delete('/:id', deleteNotification);

module.exports = router;