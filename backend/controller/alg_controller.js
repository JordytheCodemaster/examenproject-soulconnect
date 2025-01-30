const express = require('express');
const router = express.Router();
const pool = require('../src/db');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const getRandomUsersAndGiveScores = async (req, res) => {
     try {

          // fetch current user intrests 
           // get cookie token
          let token = req.cookies.token; // moet ik naar de cookie veranderen later

          if (!token) {
               return res.status(401).json({ message: 'No cookie/token provided' });
          }
          let decoded;
          try {
          decoded = jwt.verify(token, process.env.JWT_SECRET);
          } catch (err) {
          return res.status(403).json({ message: 'Invalid or expired token' });
          }
          const reqUserId = decoded.id;
          // get cookie token

          let myInterestsQuery = 'SELECT category_id, value FROM __user_categories WHERE user_id = ?';

          console.log("UserID of cookie: " + reqUserId);

          const rows = await pool.query(myInterestsQuery, [reqUserId]);

          // fetch random people

          const randomUsersQuery = `SELECT id, avatar_url,birth_date, username, gender 
               FROM users 
               WHERE id != ? 
               AND id NOT IN (SELECT liked_user_id FROM likes WHERE user_id = ?)
               AND gender = ?
               ORDER BY RAND() 
               LIMIT 50;
               `;
          const reqGender = req.body.gender;
          const randomUsers = await pool.query(randomUsersQuery, [reqUserId, reqUserId, reqGender]);


          if (!randomUsers || randomUsers.length === 0) {
               return res.status(404).json({ message: 'No users found' });
          }

          if (Array.isArray(rows) && rows.length > 0) {
               const myInterests = rows.map(row => ({
                    id: row.category_id,
                    value: row.value
          }));

          const weights = {
               7: 12, // Relationship-related
               9: 10,  // Language
               8: 5,  // Education
               11: 7, // Interests
               13: 5, // Art
               16: 5, // Music
               14: 3, // Fashion
               17: 2, // activity
               18: 2, // Open for
               19: 2, // Yes/No
               20: 2, // Yes/No
          };

          const userScores = await Promise.all(randomUsers.map(async user => {
               const userInterestsQuery = 'SELECT category_id, value FROM __user_categories WHERE user_id = ?';
               const userInterestsRows = await pool.query(userInterestsQuery, [user.id]);

               const userScore = userInterestsRows.reduce((score, userInterest) => {
                    // Check for an exact match in both category_id and value
                    const isMatch = myInterests.some(myInterest =>
                         myInterest.id === userInterest.category_id &&
                         myInterest.value.trim().toLowerCase() === userInterest.value.trim().toLowerCase()
                    );
                    
                    const weight = weights[userInterest.category_id] || 1;

                    // Add 5 points if there's a match
                    return score + (isMatch ? 1 * weight : 0);
               }, 0);

               // dankjewel stackoverflow!
               const calculateAge = (birthDate) => {
                    const today = new Date();
                    const birth = new Date(birthDate);
                    let age = today.getFullYear() - birth.getFullYear();
                    const monthDifference = today.getMonth() - birth.getMonth();
                    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birth.getDate())) {age--;}return age;
               };

               return {
                    id: user.id,
                    username: user.username,
                    score: userScore,
                    avatar_url: user.avatar_url,
                    interests: userInterestsRows,
                    gender: user.gender,
                    age: calculateAge(user.birth_date),
               };
          }));

          const topUsers = userScores.sort((a, b) => b.score - a.score).slice(0, 10);

            res.status(200).json({
                success: true,
                my_interests: myInterests,
                total_users_checked: randomUsers.length,
                top_users_count: topUsers.length,
                top_users: topUsers,
                pref_age: req.body.age,
                pref_gender: req.body.gender,

            });
        } else {
            res.status(500).json({ message: 'Error: No categories found for this user' });
        }
     } catch (error) {
          console.log("Error.", error);
     }
};

module.exports = { getRandomUsersAndGiveScores };