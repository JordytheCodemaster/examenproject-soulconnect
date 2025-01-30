const express = require('express');
const app = express();
const paymentRoutes = require('./routes/payment_routes');
const emailRoutes = require('./routes/email_routes');
const adminRoutes = require('./routes/admin_routes'); // Import admin routes

app.use(express.json());
app.use('/api/payments', paymentRoutes);
app.use('/api/emails', emailRoutes);
app.use('/api/admin', adminRoutes); // Use admin routes

// ...existing code...

module.exports = app;
