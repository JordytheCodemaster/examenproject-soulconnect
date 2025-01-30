const express = require('express');
const router = express.Router();
const { getLikes, createLike, getGivenLikes, checkLike, deleteLike, getAllLikes } = require('../controller/likes_controller');

router.get('/likes', getLikes);
router.post('/likes', createLike);
router.get('/likes/given', getGivenLikes);
router.post('/likes/check', checkLike);
router.delete('/likes/:id', deleteLike);
router.get('/likes/all', getAllLikes);

module.exports = router;