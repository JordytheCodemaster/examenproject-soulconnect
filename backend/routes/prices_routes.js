const express = require('express');
const router = express.Router();
const { getPrices, getPricebyId, updatePrice, deletePrice } = require('../controller/prices_controller');

// Route to get all prices
router.get('/', getPrices);

router.get('/:id', getPricebyId);



// Route to update a price
router.put('/:id', updatePrice);

// Route to delete a price
router.delete('/:id', deletePrice);

module.exports = router;
