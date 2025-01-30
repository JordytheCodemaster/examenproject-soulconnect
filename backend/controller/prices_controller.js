const pool = require('../src/db');
const jwt = require('jsonwebtoken');

// Get all prices
const getPrices = async (req, res) => {
    const token = req.cookies.token; // Get the token from the cookie
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET); // Verify the token
        const rows = await pool.query('SELECT * FROM prices');
        res.status(200).json(rows);

    } catch (error) {
        console.error('Error fetching prices:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getPricebyId = async (req, res) => {
    const { id } = req.params;
    const token = req.cookies.token; // Get the token from the cookie
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET); // Verify the token
        const rows = await pool.query('SELECT * FROM prices WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Price not found' });
        }
        res.status(200).json(rows[0]);

    } catch (error) {
        console.error('Error fetching price:', error);
        res.status(500).json({ message: 'Server error' });
    }
};




// Update a price
const updatePrice = async (req, res) => {
    const token = req.cookies.token; // Get the token from the cookie
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const { id } = req.params;
    const {description, total_days, value, title} = req.body;
    try {
        jwt.verify(token, process.env.JWT_SECRET); // Verify the token
        const result = await pool.query('UPDATE prices SET title= ?, description= ?, total_days = ?, value = ? WHERE id = ?', [description, total_days, value, title, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Price not found' });
        }
        res.status(200).json({ message: 'Price updated successfully' });
    } catch (error) {
        console.error('Error updating price:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a price
const deletePrice = async (req, res) => {
    const token = req.cookies.token; // Get the token from the cookie
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const { id } = req.params;
    try {
        jwt.verify(token, process.env.JWT_SECRET); // Verify the token
        const result = await pool.query('DELETE FROM prices WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Price not found' });
        }
        res.status(200).json({ message: 'Price deleted successfully' });
    } catch (error) {
        console.error('Error deleting price:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getPrices, getPricebyId, updatePrice, deletePrice };
