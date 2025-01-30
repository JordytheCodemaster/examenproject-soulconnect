const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../src/db');
const { use } = require('../routes/prices_routes');

const adminLogin = async (req, res) => {
    const { email, password } = req.body;
    console.log('Request Body:', req.body);
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
        const rows = await pool.query('SELECT * FROM admin WHERE email = ?', [email]);
        console.log('Request Body:', req.body, rows);

        const admin = Array.isArray(rows) ? rows[0] : rows;
        console.log('Request Body:', req.body, admin);

        if (!admin) {
            return res.status(400).json({ message: 'No admin found with this email' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        console.log('Request Body:', req.body, isMatch);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const adminPayload = { id: admin.id, email: admin.email };
        console.log('Request Body:', req.body, adminPayload);

        const token = jwt.sign(adminPayload, process.env.JWT_SECRET, { expiresIn: '7d' });
        console.log('Request Body:', req.body, token);


        res.cookie('adminToken', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'Lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({ message: 'Login successful', admin: { id: admin.id, email: admin.email } });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const adminRegister = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
        const [rows] = await pool.query('SELECT * FROM admin WHERE email = ?', [email]);
        if (Array.isArray(rows) && rows.length > 0) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const result = await pool.query('INSERT INTO admin (email, password) VALUES (?, ?)', [email, hashedPassword]);
        res.status(201).json({ message: 'Admin registered successfully', adminId: result.insertId.toString() });
    } catch (error) {
        console.error('Error registering admin:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const updateAdmin = async (req, res) => {
    const token = req.cookies.adminToken;
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }

    const { email, password } = req.body;
    if (!email && !password) {
        return res.status(400).json({ message: 'Email or password is required.' });
    }

    try {
        const updates = [];
        const values = [];

        if (email) {
            updates.push('email = ?');
            values.push(email);
        }

        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            updates.push('password = ?');
            values.push(hashedPassword);
        }

        values.push(decoded.id);

        const result = await pool.query(`UPDATE admin SET ${updates.join(', ')} WHERE id = ?`, values);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        res.status(200).json({ message: 'Admin updated successfully' });
    } catch (error) {
        console.error('Error updating admin:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const updateSubscriptionPrice = async (req, res) => {
    const token = req.cookies.adminToken;
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
    const { price } = req.body;

    if (!price) {
        return res.status(400).json({ message: 'Price is required.' });
    }

    try {
        const result = await pool.query('UPDATE subscriptions SET price = ? WHERE id = ?', [price, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Subscription not found' });
        }
        res.status(200).json({ message: 'Subscription price updated successfully' });
    } catch (error) {
        console.error('Error updating subscription price:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const updatePrice = async (req, res) => {
    const { id, value, title, total_days, description } = req.body;

    if (!id || !value || !title || !total_days || !description) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const result = await pool.query(
            'UPDATE prices SET value = ?, title = ?, total_days = ?, description = ? WHERE id = ?',
            [value, title, total_days, description, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Price not found' });
        }

        res.status(200).json({ message: 'Price updated successfully' });
    } catch (error) {
        console.error('Error updating price:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getPrices = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM prices');
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching prices:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
const banUser = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('UPDATE users SET is_suspended = 1 WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User banned successfully' });
    } catch (error) {
        console.error('Error banning user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Unban a user
const unbanUser = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('UPDATE users SET is_suspended = 0 WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User unbanned successfully' });
    } catch (error) {
        console.error('Error unbanning user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


// Create a new price
const createPrice = async (req, res) => {
    const token = req.cookies.token; // Get the token from the cookie
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    const { description, total_days, value, title } = req.body;
    try {
        jwt.verify(token, process.env.JWT_SECRET); // Verify the token
        const result = await pool.query('INSERT INTO prices (description, total_days, value, title) VALUES (?, ?, ?, ?)', [description, total_days, value, title]);
        res.status(201).json({ message: 'Price created successfully', id: result.insertId.toString() });
    } catch (error) {
        console.error('Error creating price:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    adminLogin,
    adminRegister,
    updateAdmin,
    updateSubscriptionPrice,
    updatePrice,
    unbanUser,
    createPrice,
    banUser,
    getPrices // Export the new function
};
