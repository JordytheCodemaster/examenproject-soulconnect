const pool = require('../src/db');
const jwt = require('jsonwebtoken');

const getAllMatches = async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }

    try {
        // Query to get matches, the other user's data, and their categories
        const matches = await pool.query(
            `SELECT 
                m.id AS match_id,
                u.id AS user_id,
                u.username,
                u.birth_date,
                u.gender,
                u.avatar_url,
                uc.category_id,
                uc.value AS category_value
             FROM matches m
             JOIN users u ON 
                (m.user1_id = u.id AND m.user2_id = ?) OR 
                (m.user2_id = u.id AND m.user1_id = ?)
             LEFT JOIN __user_categories uc ON u.id = uc.user_id
             WHERE m.user1_id = ? OR m.user2_id = ?`,
            [decoded.id, decoded.id, decoded.id, decoded.id]
        );

        // Group the results by user to include categories in a nested structure
        const groupedMatches = matches.reduce((acc, row) => {
            const matchId = row.match_id;
            const userId = row.user_id;

            if (!acc[matchId]) {
                acc[matchId] = {
                    match_id: matchId,
                    user: {
                        id: userId,
                        username: row.username,
                        birth_date: row.birth_date,
                        gender: row.gender,
                        avatar_url: row.avatar_url,
                        categories: []
                    }
                };
            }

            // Add category data if it exists
            if (row.category_id) {
                acc[matchId].user.categories.push({
                    category_id: row.category_id,
                    value: row.category_value
                });
            }

            return acc;
        }, {});

        // Convert the grouped object into an array
        const result = Object.values(groupedMatches);

        res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching matches:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getAllMatches
};