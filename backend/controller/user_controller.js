const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../src/db');
const { sendEmail, sendPasswordChangeEmail, sendEmailChangeNotification } = require('./email_controller'); // Import sendEmail, sendPasswordChangeEmail, and sendEmailChangeNotification functions
const upload = require('../middleware/fileUpload'); // Import multer file upload middleware
const path = require('path');

const userCreate = async (req, res) => {
  const { username, password, email, birth_date, gender, accepted_user_agreement } = req.body;

  console.log('Request Body:', req.body); // Log request body

  if (!username || !password || !email || !birth_date || !gender || !accepted_user_agreement) {
    return res.status(400).json({ message: 'Username, email, and password are required.' });
  }

  // Age validation: Check if the user is at least 18 years old
  const birthDate = new Date(birth_date);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  const dayDifference = today.getDate() - birthDate.getDate();

  if (age < 18 || (age === 18 && (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)))) {
    return res.status(400).json({ message: 'You must be at least 18 years old to create an account.' });
  }

  try {
    const queryResult = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    const rows = queryResult.length ? queryResult : [];

    if (rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await pool.query(
      'INSERT INTO users (username, password, email, birth_date, gender, accepted_user_agreement) VALUES (?, ?, ?, ?, ?, ?)',
      [username, hashedPassword, email, birth_date, gender, accepted_user_agreement]
    );

    const insertId = result.insertId.toString();

    if (result && insertId) {
      const userPayload = { id: insertId, email, username };
      const token = jwt.sign(userPayload, process.env.JWT_SECRET, { expiresIn: '7d' });

      res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'Lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      // Send verification email
      await sendEmail(token);

      // Send verification email
      await sendEmail(token);

      res.status(201).json({
        message: 'User created successfully',
        user: { insertId, username, email },
      });
    } else {
      res.status(500).json({ message: 'Error inserting user into database' });
    }
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
const getUID = (req, res) => {
  const token = req.cookies.token; // Get the token from the cookies
  if (!token) {
    throw new Error('No token provided');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    return res.status(200).json(decoded.id);
  } catch (err) {
    throw new Error('Invalid or expired token');
  }
};
const updateUserProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }
    const token = req.cookies.token; // Get the token from the cookie
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    const userId = decoded.id; // Extract the user ID from the token

    const profilePictureUrl = `/uploads/${req.file.filename}`;

    // Update the user's profile picture in the database
    const result = await pool.query('UPDATE users SET avatar_url = ? WHERE id = ?', [profilePictureUrl, userId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'Profile picture updated successfully',
      profilePictureUrl,
    });
  } catch (error) {
    console.error('Error updating profile picture:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// User login function
const userLogin = async (req, res) => {
  const { password, email } = req.body;

  if (!password || !email) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    const user = Array.isArray(rows) ? rows[0] : rows;
    console.log('User Results:', user);

    if (!user) {
      return res.status(400).json({ message: 'Email or password not valid' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const userPayload = { id: user.id, email: user.email, username: user.username };
    console.log("Payload: ", userPayload);

    const token = jwt.sign(userPayload, process.env.JWT_SECRET, { expiresIn: '7d' });

    if (user.is_suspended) {
      res.status(200).json({ message: 'Login successful, but user is suspended', user: { id: user.id, username: user.username, avatar: user.avatar_url, is_suspended: user.is_suspended } });

    } else {
      res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'Lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      console.log('Generated Token:', token);
      res.status(200).json({ message: 'Login successful', user: { id: user.id, username: user.username, avatar: user.avatar_url, is_suspended: user.is_suspended } });
    }

  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user by id users
const getUser = async (req, res) => {
  const token = req.cookies.token; // Get the token from the cookie
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    const userId = decoded.id; // Extract the user ID from the token

    const connection = await pool.getConnection();
    const [user] = await connection.query('SELECT id, username, birth_date, email, gender, avatar_url FROM users WHERE id = ?', [userId]);
    console.log('User retrieved:', user);
    connection.release();
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('Error retrieving user:', err);
    return res.status(500).json({ error: err.message });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  const token = req.cookies.token; // Get the token from the cookie
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const connection = await pool.getConnection();

    try {
      // Start a transaction
      await connection.beginTransaction();

      // Delete records from related tables
      await connection.query('DELETE FROM images WHERE user_id = ?', [userId]);
      await connection.query('DELETE FROM likes WHERE user_id = ?', [userId]);
      await connection.query('DELETE FROM matches WHERE user1_id = ? OR user2_id = ?',
        [userId, userId]);
      await connection.query('DELETE FROM notifications WHERE user_id = ?', [userId]);
      await connection.query('DELETE FROM payments WHERE user_id = ?', [userId]);
      await connection.query('DELETE FROM __user_categories WHERE user_id = ?', [userId]);

      // Finally, delete the user
      const result = await connection.query('DELETE FROM users WHERE id = ?', [userId]);

      if (result.affectedRows === 0) {
        await connection.rollback();
        connection.release();
        return res.status(404).json({ message: 'User not found' });
      }

      // Commit the transaction
      await connection.commit();
      connection.release();
      return res.json({ message: `User with ID ${userId} and all associated records deleted successfully` });
    } catch (error) {
      await connection.rollback(); // Rollback transaction in case of an error
      connection.release();
      console.error('Error deleting user and associated records:', error);
      return res.status(500).json({ error: 'Failed to delete user and associated records' });
    }
  } catch (err) {
    console.error('Error verifying token or deleting user:', err);
    return res.status(500).json({ error: err.message });
  }
};


// Change user email
const updateUserEmail = async (req, res) => {
  const token = req.cookies.token; // Get the token from the cookie
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    const userId = decoded.id; // Extract the user ID from the token

    const connection = await pool.getConnection();
    const [user] = await connection.query('SELECT email FROM users WHERE id = ?', [userId]);
    connection.release();

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const result = await pool.query('UPDATE users SET email = ? WHERE id = ?', [email, userId]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    await sendEmailChangeNotification(user.email, email);

    return res.json({ message: `Email of user with ID ${userId} successfully changed to ${email}` });
  } catch (err) {
    console.error('Error updating email:', err);
    return res.status(500).json({ error: err.message });
  }
};

// Update user password
const updateUserPassword = async (req, res) => {
  const token = req.cookies.token; // Get the token from the cookie
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Current password and new password are required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    const userId = decoded.id; // Extract the user ID from the token

    const connection = await pool.getConnection();
    const [user] = await connection.query('SELECT email, password FROM users WHERE id = ?', [userId]);
    connection.release();

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const result = await pool.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, userId]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send password change email
    await sendPasswordChangeEmail(user.email);

    return res.json({ message: `Password of user with ID ${userId} successfully changed` });
  } catch (err) {
    console.error('Error updating password:', err);
    return res.status(500).json({ error: err.message });
  }
};
const checkEmailVerified = async (req, res) => {
  const token = req.cookies.token; // Get the token from the cookie

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify the token and get the user_id
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user_id = decoded.id;

    const rows = await pool.query('SELECT email_verified_at FROM users WHERE id = ?', [user_id]);
    const user = Array.isArray(rows) ? rows[0] : rows;

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    if (user.email_verified_at) {
      return res.status(200).json({ email_verified: true });
    } else {
      return res.status(200).json({ email_verified: false });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error checking email verification status' });
  }
};
// Logout user
const userLogout = (req, res) => {
  res.clearCookie('token'); // Clear the token cookie
  res.status(200).json({ message: 'Logout successful' });
};

const getAllUsers = async (req, res) => {
  try {
    const rows = await pool.query('SELECT id, email FROM users');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
const getUserPayments = async (req, res) => {
  const token = req.cookies.adminToken; // Get the token from the cookie
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token

    const connection = await pool.getConnection();
    console.log('Connection:', connection);
    const payments = await connection.query('SELECT * FROM payments WHERE user_id = ?');
    connection.release();

    if (!payments.length) {
      return res.status(404).json({ message: 'No payments found for this user' });
    }

    res.status(200).json(payments);
  } catch (err) {
    console.error('Error fetching user payments:', err);
    return res.status(500).json({ error: err.message });
  }
};

const getAllUsersWithPayments = async (req, res) => {
  const token = req.cookies.token;


  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET); // Verify the token

    const query = `
        SELECT u.id AS user_id, u.username, u.email, u.is_suspended,
       p.id AS payment_id, p.title, p.paid, p.created_at, p.days
FROM users u
LEFT JOIN payments p ON u.id = p.user_id;

    `;
    const users = await pool.query(query);
    console.log('Users:', users);
    const usersMap = [];

    users.forEach(user => {
      if (!usersMap[user.user_id]) {
        usersMap[user.user_id] = {
          id: user.user_id,
          username: user.username,
          email: user.email,
          is_suspended: user.is_suspended,
          payments: []
        };
      }
      if (user.payment_id) {
        usersMap[user.user_id].payments = {
          title: user.title,
          paid: user.paid,
          created_at: user.created_at,
          days: user.days
        };
      }
    });
    console.log('Users Map:', usersMap);
    res.status(200).json(Object.values(usersMap));

  } catch (error) {
    console.error('Error fetching users with payments:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getUserImages = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // Query to fetch images associated with the user
    const images = await pool.query('SELECT * FROM images WHERE user_id = ?', [userId]);

    console.log('Images query result:', images); // Check the result structure

    if (!Array.isArray(images)) {
      return res.status(404).json({ message: 'No images found for this user' });
    }

    const imageUrls = images.map(image => `http://localhost:5000${image.image_url}`);
    return res.status(200).json({ images: imageUrls });
  } catch (error) {
    console.error('Error fetching user images:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getOtherUserImages = async (req, res) => {
  try {
    const userId = req.params.userId; // Ensure this matches the URL param
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Query to fetch images associated with the other user
    const images = await pool.query('SELECT * FROM images WHERE user_id = ?', [userId]);

    console.log('Images query result:', images); // Log the result to see the data structure

    if (Array.isArray(images) && images.length > 0) {
      const imageUrls = images.map(image => {
        if (image && image.image_url) {
          return `http://localhost:5000${image.image_url}`;
        }
        return null;
      }).filter(Boolean);

      console.log('Formatted image URLs:', imageUrls); // Log the image URLs before returning
      return res.status(200).json({ images: imageUrls });
    } else {
      return res.status(404).json({ message: 'No images found for this user' });
    }
  } catch (error) {
    console.error('Error fetching user images:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = {
  getUID,
  userLogin,
  userCreate,
  getUser,
  deleteUser,
  checkEmailVerified,
  updateUserEmail,
  updateUserPassword,
  userLogout,
  updateUserProfilePicture,
  getAllUsers,
  getUserPayments,
  getAllUsersWithPayments,
  getUserImages,
  getOtherUserImages,
};
