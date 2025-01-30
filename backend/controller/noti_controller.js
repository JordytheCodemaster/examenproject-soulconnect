const express = require('express');
const router = express.Router();
const pool = require('../src/db');
const jwt = require('jsonwebtoken');

// Create a notification
const createNotification = async (req, res) => {
    const { title, text, type } = req.body;
    const token = req.cookies.token; // Get the token from the cookie

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // Verify the token and get the user_id
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user_id = decoded.id;

        if (!user_id || !title || !text || !type) {
            return res.status(400).json({ message: 'User ID, title, text, and type are required' });
        }

        const connection = await pool.getConnection();

        // Insert the new notification
        const result = await connection.query(
            'INSERT INTO notifications (user_id, title, text, type) VALUES (?, ?, ?, ?)',
            [user_id, title, text, type]
        );
        connection.release();

        if (result.affectedRows === 1) {
            return res.status(201).json({ message: 'Notification successfully created' });
        } else {
            return res.status(500).json({ message: 'Error creating notification' });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error creating notification' });
    }
};

// Delete a notification
const deleteNotification = async (req, res) => {
    const id = req.params.id;

    try {
        const connection = await pool.getConnection();
        const result = await connection.query('DELETE FROM notifications WHERE id = ?', [id]);
        connection.release();

        if (result.affectedRows === 1) {
            return res.status(204).json({ message: 'Notification successfully deleted' });
        } else {
            return res.status(404).json({ message: 'Notification not found' });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error deleting notification' });
    }
};

// Get notifications for a user based on the token in the cookie
const getNotifications = async (req, res) => {
    try {
        const token = req.cookies.token; // Get token from the cookie
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        // Verify the token and extract user ID
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id; // Extract the user ID from the token

        const connection = await pool.getConnection();

        // Query to fetch notifications for the user
        const notifications = await connection.query(
            'SELECT id, user_id, title, text, type, created_at FROM notifications WHERE user_id = ?',
            [userId]
        );
        connection.release();

        res.json(notifications); // Return notifications
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error fetching notifications' });
    }
};

module.exports = { getNotifications, createNotification, deleteNotification };