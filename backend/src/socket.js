const { Server } = require("socket.io");
const messageController = require("../controller/message_controller"); 
const jwt = require('jsonwebtoken');

module.exports = (httpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"],
            credentials: true, // Allow cookies to be sent
        },
    });

    io.on("connection", (socket) => {
        const cookieHeader = socket.handshake.headers.cookie;
        if (!cookieHeader) {
            socket.emit("error", "No authentication cookie found.");
            return socket.disconnect("no cookie found!");
        }

        // Parse the cookie to extract the token
        const token = cookieHeader.split('; ').find(row => row.startsWith('token='))?.split('=')[1];

        if (!token) {
            socket.emit("error", "Authentication token not found.");
            return socket.disconnect("token not found");
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            socket.userId = decoded.id; // Attach userId to the socket instance
            console.log(`User connected: ${socket.userId}`);
        } catch (err) {
            socket.emit("error", "Invalid or expired token.");
            return socket.disconnect("Inavlid token");
        }

        // Socket event handlers go here...
        socket.on("join-chat", async ({ chatId }) => {
            if (!socket.userId) {
                socket.emit("error", "User not authenticated.");
                return;
            }

            socket.join(`chat-${chatId}`);
            console.log(`User ${socket.userId} joined chat ${chatId}`);

            try {
                const chatHistory = await messageController.getChatHistory(chatId);
                socket.emit("chat-history", chatHistory);
            } catch (err) {
                console.log("Error. failed" + err);
                socket.emit("error", "Failed to fetch chat history." + err);
            }
        });

        socket.on("send-message", async ({ chatId, text }) => {
            console.log('Attempting to send message:', chatId, text);
        
            if (!socket.userId) {
                socket.emit("error", "User not authenticated.");
                return;
            }
        
            try {
                // Save message to the database
                const newMessage = await messageController.saveMessage(chatId, socket.userId, text);
                console.log("THE NEW EMSSAGE RN: " + newMessage);
                // Emit the message to the specific chat room
                io.to(`chat-${chatId}`).emit("receive-message", newMessage);
                
                console.log("Message sent to chat:", chatId);
            } catch (err) {
                console.error("Error sending message:", err);
                socket.emit("error", "Failed to send message.");
            }
        });

        socket.on("disconnect", (reason) => {
            console.log(`User disconnected: ${socket.userId}, reason: ${reason}`);
        });
    });
};
