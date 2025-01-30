const jwt = require('jsonwebtoken');
const pool = require('../src/db'); 

const test = async (req, res) => {
    try {
        // Extract the token from the cookies
        const token = req.cookies.token;

        // Check if the token exists
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No token provided',
            });
        }

        // Verify the token and extract the user ID
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        // Check if a user with this ID exists in the database
        const query = 'SELECT id, is_suspended FROM users WHERE id = ?';
        const [rows] = await pool.query(query, [userId]);

        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }
        console.log(rows);
        // If user exists, send success response
        res.status(200).json({
            success: true,
            message: 'User exists',
            is_suspended: rows.is_suspended,
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred',
        });
    }
};

module.exports = {
    test,
};
