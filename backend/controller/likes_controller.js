const express = require('express');
const router = express.Router();
const pool = require('../src/db');
const jwt = require('jsonwebtoken');

const createLike = async (req, res) => {
  const { liked_user_id } = req.body;
  const token = req.cookies.token; // Get the token from the cookie

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify the token and get the user_id
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user_id = decoded.id;

    if (!user_id || !liked_user_id) {
      return res.status(400).json({ message: 'User ID and liked user ID are required' });
    }

    const connection = await pool.getConnection();

    // Check if the like already exists (prevent duplicates)
    const existingLike = await connection.query(
      'SELECT * FROM likes WHERE user_id = ? AND liked_user_id = ?',
      [user_id, liked_user_id]
    );

    if (existingLike.length > 0) {
      // If a like already exists, return an error
      connection.release();
      return res.status(400).json({ message: 'You have already liked this user' });
    }

    // Insert the new like
    const result = await connection.query(
      'INSERT INTO likes (user_id, liked_user_id) VALUES (?, ?)',
      [user_id, liked_user_id]
    );

    // Check if the other user has already liked the current user
    const reciprocalLike = await connection.query(
      'SELECT * FROM likes WHERE user_id = ? AND liked_user_id = ?',
      [liked_user_id, user_id]
    );

    // If both users have liked each other, create a match
    if (reciprocalLike.length > 0) {
      const matchResult = await connection.query(
        'INSERT INTO matches (user1_id, user2_id) VALUES (?, ?)',
        [Math.min(user_id, liked_user_id), Math.max(user_id, liked_user_id)]
      );

      if (matchResult.affectedRows === 1) {
        console.log('Match created successfully');
      }
    }

    // Create a notification for the liked user
    const notificationResult = await connection.query(
      'INSERT INTO notifications (user_id, title, text, type, created_at) VALUES (?, ?, ?, ?, NOW())',
      [liked_user_id, 'New Like', `You have received a like from user ${user_id}`, 'like']
    );

    connection.release();

    if (result.affectedRows === 1 && notificationResult.affectedRows === 1) {
      return res.status(201).json({ message: 'Like and notification successfully created' });
    } else {
      return res.status(500).json({ message: 'Error creating like or notification' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error creating like or notification' });
  }
};
// delete like
const deleteLike = async (req, res) => {
  const liked_user_id = req.params.id;

  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify the token and get the user_id
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user_id = decoded.id;

    if (!user_id || !liked_user_id) {
      return res.status(400).json({ message: 'User ID and liked user ID are required' });
    }

    const connection = await pool.getConnection();

    // 1. Delete the like only from the current user (user_id -> liked_user_id)
    const result = await connection.query(
      'DELETE FROM likes WHERE user_id = ? AND liked_user_id = ?',
      [user_id, liked_user_id]
    );


    if (result.affectedRows === 1) {

      const deleteMatch = await connection.query(
        'DELETE FROM matches WHERE (user1_id = ? AND user2_id = ?) OR (user1_id = ? AND user2_id = ?)',
        [user_id, liked_user_id, liked_user_id, user_id]
      );
      console.log(deleteMatch)

      if (deleteMatch.affectedRows === 1) {
        console.log('Match deleted successfully');
      }


      return res.status(204).json({ message: 'Like successfully removed' });
    } else {
      return res.status(404).json({ message: 'Like not found' });
    }

    connection.release();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error removing like' });
  }
};





// get likes for a user based on the token in the cookie
const getLikes = async (req, res) => {
  console.log(req.query.max);
  const max = parseInt(req.query.max, 10);
  if (isNaN(max) || max <= 0) {
    return res.status(400).json({ message: "Invalid 'max' value" });
  }
  try {
    const token = req.cookies.token; // Get token from the cookie
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Verify the token and extract user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id; // Extract the user ID from the token

    const connection = await pool.getConnection();

    // Query to fetch likes with user details
    const likes = await connection.query(`
      SELECT 
        likes.id,
        likes.user_id, 
        users.username, 
        users.avatar_url, 
        likes.liked_user_id
      FROM likes
      JOIN users ON users.id = likes.liked_user_id
      WHERE likes.user_id = ?
      LIMIT  ${max}
    `, [userId]);

    connection.release();


    res.json(likes); // Return likes with user details
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error fetching likes' });
  }
};

// get given likes for a user based on the token in the cookie
const getGivenLikes = async (req, res) => {
  try {
    const token = req.cookies.token; // Get token from the cookie
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Verify the token and extract user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id; // Extract the user ID from the token

    const connection = await pool.getConnection();

    // Query to fetch given likes with user details
    const likes = await connection.query(`
      SELECT 
        likes.id, 
        likes.user_id,
        likes.liked_user_id, 
        users.username, 
        users.avatar_url
      FROM likes
      JOIN users ON users.id = likes.user_id
      WHERE likes.liked_user_id = ?
    `, [userId]);

    connection.release();



    res.json(likes); // Return given likes with user details
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error fetching given likes' });
  }
};




const checkLike = async (req, res) => {
  const { user_id, liked_user_id } = req.body;

  if (!user_id || !liked_user_id) {
    return res.status(400).json({ message: 'User  ID en liked user ID zijn vereist' });
  }

  try {
    const connection = await pool.getConnection();
    const [like] = await connection.query('SELECT * FROM likes WHERE user_id = ? AND liked_user_id = ?', [user_id, liked_user_id]);
    connection.release();

    if (like) {
      return res.status(200).json(true);
    } else {
      return res.status(200).json(false);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Fout bij het controleren van het like' });
  }
};
// haalt alle user likes op
const getAllLikes = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const likes = await connection.query('SELECT * FROM likes');
    connection.release();

    if (!likes || likes.length === 0) {
      return res.status(404).json({ message: 'Geen likes gevonden' });
    }

    res.json(likes);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Fout bij het ophalen van de likes' });
  }
};

module.exports = { getLikes, createLike, getGivenLikes, checkLike, deleteLike, getAllLikes };