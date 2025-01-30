const express = require('express');
const router = express.Router();
const pool = require('../src/db');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const getCategories = async (req, res) => {
  try {
    const categories = await pool.query('SELECT id, name, optional, multiple FROM categories');
    const categoriesWithTypes = await Promise.all(categories.map(async (category) => {
      const types = await pool.query('SELECT value FROM category_options WHERE category_id = ?', [category.id]);
      return { id: category.id, name: category.name, optional: category.optional, multiple: category.multiple, types: types.length > 0 ? types.map((type) => type.value) : null };
    }));
    res.json(categoriesWithTypes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving categories' });
  }
};


const getUserCategories = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'No cookie/token provided' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const userCategories = await pool.query(
      `SELECT 
        userCategories.category_id AS category_id,
        categories.name,
        userCategories.value 
      FROM __user_categories AS userCategories 
      JOIN categories ON userCategories.category_id = categories.id 
      WHERE userCategories.user_id = ?`,
      [userId]
    );
    res.json(userCategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving user categories' });
  }
};

const getUserCategoriesWithTypes = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'No cookie/token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const userCategories = await pool.query(
      `SELECT 
        userCategories.category_id AS id,
        categories.name,
        categories.multiple,
        userCategories.value
      FROM __user_categories AS userCategories 
      JOIN categories ON userCategories.category_id = categories.id 
      WHERE userCategories.user_id = ?`,
      [userId]
    );

    res.json(userCategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving user categories with types' });
  }
};

const getUsersWithCategories = async (req, res) => {
  try {
    const users = await pool.query('SELECT id, username FROM users');
    const usersWithCategories = await Promise.all(users.map(async (user) => {
      const userCategories = await pool.query(
        `SELECT 
          userCategories.category_id AS category_id,
          categories.name,
          userCategories.value 
        FROM __user_categories AS userCategories 
        JOIN categories ON userCategories.category_id = categories.id 
        WHERE userCategories.user_id = ?`,
        [user.id]
      );
      return { id: user.id, username: user.username, categories: userCategories };
    }));
    res.json(usersWithCategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving users with categories' });
  }
};

const getUserWithCategories = async (req, res) => {
  try {
    const userId = req.params.id;
    const [user] = await pool.query('SELECT id, username, birth_date, gender FROM users WHERE id = ?', [userId]);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const userCategories = await pool.query(
      `SELECT 
        userCategories.category_id AS category_id,
        categories.name,
        userCategories.value 
      FROM __user_categories AS userCategories 
      JOIN categories ON userCategories.category_id = categories.id 
      WHERE userCategories.user_id = ?`,
      [user.id]
    );
    res.json({ id: user.id, username: user.username, birth_date: user.birth_date, gender: user.gender, categories: userCategories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving user with categories' });
  }
};




const updateUserCategories = async (req, res) => {
  try {
    console.log("Starting category update...");
    const token = req.cookies.token;

    // Validate token
    if (!token) {
      return res.status(401).json({ message: "No cookie/token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id; // Extract user ID from the token
    const categories = req.body;

    // Validate the category format asynchronously
    const validateCategories = async (categories) => {
      for (const category of categories) {
        if (
          typeof category.category_id !== "number" ||
          typeof category.value !== "string"
        ) {
          throw new Error("Invalid category format");
        }
      }
    };

    await validateCategories(categories);

    console.log("Validated categories:", categories);

    // Delete existing records for the provided category_ids
    const deleteQuery = `
      DELETE FROM __user_categories
      WHERE user_id = ?
    `;
    const deleteResult = await pool.query(deleteQuery, [userId]);

    if (deleteResult.affectedRows === 0) {
      console.warn("No existing categories were deleted.");
    }

    // Insert new records
    const placeholders = categories.map(() => "(?, ?, ?)").join(", ");
    const values = categories.flatMap((category) => [
      userId,
      category.category_id,
      category.value,
    ]);

    const insertQuery = `
      INSERT INTO __user_categories (user_id, category_id, value)
      VALUES ${placeholders}
    `;
    await pool.query(insertQuery, values);

    console.log("Inserted new records:", values);

    res.status(200).json({ message: "User categories updated successfully" });
  } catch (error) {
    console.error("Error updating user categories:", error);

    res.status(500).json({
      message: "Error updating user categories",
      error: error.message,
    });
  }
};





const updateUserCategory = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'No cookie/token provided' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const { category_id, value } = req.body;

    // Check if the category already exists for the user
    const [existingCategory] = await pool.query(
      'SELECT * FROM __user_categories WHERE user_id = ? AND category_id = ?',
      [userId, category_id]
    );

    if (existingCategory) {
      // Update the existing category
      await pool.query(
        'UPDATE __user_categories SET value = ? WHERE user_id = ? AND category_id = ?',
        [value, userId, category_id]
      );
    } else {
      // Insert the new category
      await pool.query(
        'INSERT INTO __user_categories (user_id, category_id, value) VALUES (?, ?, ?)',
        [userId, category_id, value]
      );
    }

    res.json({ message: 'User category updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || 'Error updating user category' });
  }
};

const createUserCategories = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'No cookie/token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const categories = req.body.categories;

    // Iterate through the categories and insert them one-by-one
    await Promise.all(categories.map(async (category) => {
      if (!category.category_id || !category.value) {
        throw new Error(`Category data is incomplete for: ${JSON.stringify(category)}`);
      }

      // Check if the category already exists for the user
      const [existingCategory] = await pool.query(
        'SELECT * FROM __user_categories WHERE user_id = ? AND category_id = ?',
        [userId, category.category_id]
      );

      if (existingCategory) {
        // If it already exists, update the value instead of inserting
        await pool.query(
          'UPDATE __user_categories SET value = ? WHERE user_id = ? AND category_id = ?',
          [category.value, userId, category.category_id]
        );
      } else {
        // Otherwise, insert the new category
        await pool.query(
          'INSERT INTO __user_categories (user_id, category_id, value) VALUES (?, ?, ?)',
          [userId, category.category_id, category.value]
        );
      }
    }));

    res.json({ message: 'User categories created/updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || 'Error creating user categories' });
  }
};




module.exports = { getCategories, getUsersWithCategories, getUserWithCategories, updateUserCategories, getUserCategoriesWithTypes, getUserCategories, createUserCategories, updateUserCategory };