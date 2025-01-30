const pool = require('../src/db');
const jwt = require('jsonwebtoken');
const { sendSubscriptionEmail, sendSubscriptionUpdateEmail, sendSubscriptionCancelEmail } = require('./email_controller');

const processPayment = (req, res) => {
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

    // Implement payment processing logic here
    res.send('Payment processed successfully');
};

const createSubscription = async (req, res) => {
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

    const { title, days, paid, created_at } = req.body;



    try {
        const result = await pool.query('INSERT INTO payments (user_id, title, days, paid, created_at) VALUES (?, ?, ?, ?, ?)', [decoded.id, title, days, paid, created_at]);
        await sendSubscriptionEmail(decoded.email, days, paid); // Send subscription email
        res.status(201).json({ message: 'Subscription created successfully', id: result.insertId.toString() });
    } catch (error) {
        console.error('Error creating subscription:', error);
        res.status(500).json({ message: 'Server error' + error });
    }
};

const updateSubscription = async (req, res) => {
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

    const { id } = req.params;
    const { until, paid } = req.body;
    try {
        const result = await pool.query('UPDATE payments SET until = ?, paid = ? WHERE id = ?', [until, paid, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Subscription not found' });
        }
        await sendSubscriptionUpdateEmail(decoded.email, until, paid); // Send subscription update email
        res.status(200).json({ message: 'Subscription updated successfully' });
    } catch (error) {
        console.error('Error updating subscription:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const cancelSubscription = async (req, res) => {
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

    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM payments WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Subscription not found' });
        }
        await sendSubscriptionCancelEmail(decoded.email); // Send subscription cancel email
        res.status(200).json({ message: 'Subscription canceled successfully' });
    } catch (error) {
        console.error('Error canceling subscription:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const checkExpiredSubscriptions = async () => {
    try {
        // Mark subscriptions as expired if they ended more than 5 days ago
        const markExpiredResult = await pool.query('UPDATE payments SET expired = 1 WHERE until < NOW() AND expired = 0');
        console.log(`Subscriptions marked as expired: ${markExpiredResult.affectedRows}`);

        // Delete subscriptions that have been expired for more than 5 days
        const deleteExpiredResult = await pool.query('DELETE FROM payments WHERE expired = 1 AND until < DATE_SUB(NOW(), INTERVAL 5 DAY)');
        console.log(`Expired subscriptions deleted: ${deleteExpiredResult.affectedRows}`);
    } catch (error) {
        console.error('Error handling expired subscriptions:', error);
    }
};

const getAllSubscriptions = async (req, res) => {
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
        const subscriptions = await pool.query('SELECT * FROM payments WHERE user_id = ?', [decoded.id]);
        res.status(200).json(subscriptions);
    } catch (error) {
        console.error('Error fetching subscriptions:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getSubscriptionById = async (req, res) => {
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

    const { id } = req.params;
    try {
        const [subscription] = await pool.query('SELECT * FROM payments WHERE id = ? AND user_id = ?', [id, decoded.id]);
        if (!subscription) {
            return res.status(404).json({ message: 'Subscription not found' });
        }
        res.status(200).json(subscription);
    } catch (error) {
        console.error('Error fetching subscription:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getAllSubscriptionsWithUserInfo = async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET); // Verify the token

        const query = `
            SELECT p.id, p.user_id, p.title, p.paid, p.created_at, p.days, u.username, u.email
            FROM payments p
            JOIN users u ON p.user_id = u.id
            WHERE p.expired = 0
        `;
        const subscriptions = await pool.query(query);
        res.status(200).json(subscriptions);
    } catch (error) {
        console.error('Error fetching subscriptions:', error);
        res.status(500).json({ message: 'Server error' });
    }
};



module.exports = {
    processPayment,
    createSubscription,
    updateSubscription,
    cancelSubscription,
    checkExpiredSubscriptions,
    getAllSubscriptions,
    getSubscriptionById,
    getAllSubscriptionsWithUserInfo,
};
