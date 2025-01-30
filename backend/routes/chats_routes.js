const express = require('express');
const router = express.Router();
const {getChatHistory, createChat, saveMessage, getChats} = require('../controller/message_controller');

router.post('/chats/:id', getChatHistory);
router.post('/chats/:id', saveMessage);
router.post('/get', getChats);
router.post('/create', createChat);




module.exports = router;