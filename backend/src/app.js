const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config(); // Ensure dotenv is configured at the top
const cookieParser = require('cookie-parser');
const http = require('http'); // Import the HTTP module
const cors = require('cors');
const socketHandler = require('./socket');
const adminRoutes = require('../routes/admin_routes'); // Import admin routes
const path = require('path');

const app = express();
const PORT = 5000;

// Create an HTTP server and attach Express to it
const server = http.createServer(app);

// Attach Socket.IO to the HTTP server
socketHandler(server);

// Middleware
app.use(cookieParser());
app.use(cors({
     origin: 'http://localhost:3000',
     methods: ['GET', 'POST', 'PUT', 'DELETE'],
     allowedHeaders: ['Content-Type', 'Authorization'],
     credentials: true,
     optionsSuccessStatus: 204,
}));
app.use(bodyParser.json());

// ROUTES
const test_routes = require('../routes/test_routes');
const user_routes = require('../routes/user_routes');
const likes_routes = require('../routes/likes_routes');
const categories_routes = require('../routes/categories_routes');
const alg_routes = require('../routes/alg_routes');
const email_routes = require('../routes/email_routes');
const prices_routes = require('../routes/prices_routes');
const payment_routes = require('../routes/payment_routes');
const message_routes = require('../routes/chats_routes');
const noti_routes = require('../routes/noti_routes');
const match_routes = require('../routes/match_routes');

const authenticateJWT = require('../middleware/authenticateJWT');

app.use((req, res, next) => {
     console.log(`Incoming Request: ${req.method} ${req.path}`);
     next();
});

app.use('/api/test/', authenticateJWT, test_routes);
app.use('/api/user/', user_routes);
app.use('/api/likes/',authenticateJWT, likes_routes);
app.use('/api/cat/', authenticateJWT, categories_routes);
app.use('/api/alg/', authenticateJWT, alg_routes);
app.use('/api/email/', authenticateJWT, email_routes);
app.use('/api/prices/', authenticateJWT, prices_routes);
app.use('/api/message/', authenticateJWT, message_routes);
app.use('/api/noti/', authenticateJWT, noti_routes);
app.use('/api/payment/', authenticateJWT, payment_routes);
app.use('/api/match/', authenticateJWT, match_routes);
app.use('/api/admin/', adminRoutes);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Start the server
server.listen(PORT, () => {
     console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
