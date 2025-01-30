const db = require("../src/db");
const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const pool = require("../src/db");
const { encrypt, decrypt } = require("../src/encryption");

const createChat = async (req, res) => {
    console.log("creating chat");

    // Get cookie token
    let token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'No cookie/token provided' });
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
    const auth_UID = decoded.id;
    const su_UID = req.body.su_UID;

    if (!su_UID) {
        return res.status(400).json({ message: 'Target user ID (su_UID) is required' });
    }

    try {
        // Check if a chat already exists between the two users
        const existingChat = await db.query(
            `SELECT chat_id 
             FROM __chat_users 
             WHERE chat_id IN (
                 SELECT chat_id 
                 FROM __chat_users 
                 WHERE user_id = ?  
             ) AND user_id = ?`,
            [auth_UID, su_UID]
        );

        if (existingChat.length > 0) {
            return res.status(200).json({ 
                message: 'Chat already exists', 
                chat_id: existingChat[0].chat_id 
            });
        }

        // Generate a unique chat ID
        let chat_id = Math.floor(100000 + Math.random() * 900000);
        let chatExists = await db.query("SELECT * FROM __chat_users WHERE chat_id = ?", [chat_id]);
        while (chatExists.length > 0) {
            chat_id = Math.floor(100000 + Math.random() * 900000);
            chatExists = await db.query("SELECT * FROM __chat_users WHERE chat_id = ?", [chat_id]);
        }

        // Insert both users into the chat
        await db.query("INSERT INTO __chat_users (user_id, chat_id) VALUES (?, ?)", [auth_UID, chat_id]);
        await db.query("INSERT INTO __chat_users (user_id, chat_id) VALUES (?, ?)", [su_UID, chat_id]);

        return res.status(200).json({ 
            message: `Chat created between ${auth_UID} and ${su_UID}`, 
            chat_id 
        });
    } catch (error) {
        console.error('Error creating chat:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


const getChatHistory = async (chatId) => {
    try {
        const result = await db.query(
            "SELECT id, chat_id, sender_id, text, created_at FROM messages WHERE chat_id = ? ORDER BY created_at ASC",
            [chatId]
        );

        // Decrypt each message in the result
        const decryptedMessages = result.map((message) => ({
            ...message,
            text: decrypt(message.text),
        }));

        return decryptedMessages;
    } catch (err) {
        console.error("Error fetching chat history:", err);
        throw err;
    }
};


const saveMessage = async (chatId, senderId, text) => {
    try {
        // Encrypt the message text
        const encryptedText = encrypt(text);

        // Insert the encrypted message
        const result = await db.query(
            "INSERT INTO messages (chat_id, sender_id, text, created_at) VALUES (?, ?, ?, NOW())",
            [chatId, senderId, encryptedText]
        );

        // Retrieve the last inserted ID
        const messageId = result.insertId;

        // Retrieve the full message details (encrypted)
        const message = await db.query(
            "SELECT id, chat_id, sender_id, text, created_at FROM messages WHERE id = ?",
            [messageId]
        );

        // Return the inserted message
        return {
            ...message[0],
            text: decrypt(message[0].text), // Return the decrypted message
        };
    } catch (err) {
        console.error("Error saving message:", err);
        throw err; // Throw the error so the calling function can handle it
    }
};

const getChats = async (req, res) => {
    try {
        console.log("getChats - message_controller.js");

        // get cookie token
        let token = req.cookies.token;
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

        // Get chats for the logged-in user
        let query = "SELECT user_id, chat_id FROM __chat_users WHERE user_id = ? LIMIT 25";
        console.log(query, [reqUserId]);
        const result = await db.query(query, [reqUserId]);
        console.log(result);

        if (result && result.length > 0) {

            // Iterate over each chat to fetch the second user's details
            for (let i = 0; i < result.length; i++) {
                const chat = result[i];
                
                // Find the second user (who is not the logged-in user)
                const secondUserQuery = `
                    SELECT user_id 
                    FROM __chat_users 
                    WHERE chat_id = ? AND user_id != ?
                `;
                const secondUser = await db.query(secondUserQuery, [chat.chat_id, reqUserId]);

                console.log(secondUser);

                if (secondUser && secondUser.length > 0) {
                    const secondUserId = secondUser[0].user_id;

                    // Fetch second user's username and avatar_url
                    const secondUserDataQuery = `
                        SELECT username, avatar_url 
                        FROM users 
                        WHERE id = ?
                    `;
                    const secondUserData = await db.query(secondUserDataQuery, [secondUserId]);

                    console.log(secondUserData);

                    if (secondUserData && secondUserData.length > 0) {
                        // Attach second user data to the current chat object
                        chat.secondUser_username = secondUserData[0].username;
                        chat.secondUser_avatar = secondUserData[0].avatar_url;
                    }
                }
            }

            // After adding the second user's info, return the result
            return res.status(200).json({ success: true, result });

        } else {
            return res.status(200).json({ success: false, });
        }
    } catch (e) {
        console.log(e);
    }
}


module.exports = {
    getChatHistory,
    saveMessage,
    getChats,
    createChat,
};
