const express = require('express');
const router = express.Router();
const pool = require('../src/db');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PSW,
    },
});

// Function to send verification email
const sendEmail = async (token) => {
    console.log('sendEmail function called'); // Add logging

    let userPayload;
    try {
        userPayload = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        console.log('Invalid token', error); // Add logging
        throw new Error('Ongeldige token');
    }

    const { id: userId, email } = userPayload;
    console.log('Email to be sent to:', email); // Add logging
    const verificationToken = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // HTML encode the verification link
    const verificationLink = `http://localhost:5000/api/email/verify-email?token=${encodeURIComponent(verificationToken)}`;

    // Email options
    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'E-mailverificatie',
        html: `
            <p>Fijn dat je een account bij ons hebt aangemaakt!</p>
            <hr>
            <br> Als de link niet werkt, kopieer en plak dan de volgende link in je browser: <br>
            <a href="${verificationLink}">${verificationLink}</a>  `,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email', error); // Add logging
            throw new Error('Fout bij het verzenden van de e-mail');
        } else {
            console.log('Verification email sent', info); // Add logging
        }
    });
};

// Function to verify email
const verifyEmail = async (req, res) => {
    const { token } = req.query;

    if (!token) {
        console.log('No token provided'); // Add logging
        return res.status(400).send({ message: 'Geen token verstrekt' });
    }

    let payload;
    try {
        payload = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Token verified:', payload); // Add logging
    } catch (error) {
        console.log('Invalid token', error); // Add logging
        return res.status(400).send({ message: 'Ongeldige token' });
    }

    const { userId } = payload;

    try {
        const result = await pool.query('UPDATE users SET email_verified_at = NOW() WHERE id = ?', [userId]);
        console.log('Database update result:', result); // Add logging
        res.redirect('http://localhost:3000/profile-creation'); // Redirect to home page
    } catch (dbError) {
        console.log('Error updating database', dbError); // Add logging
        res.status(500).send({ message: 'Fout bij het bijwerken van de database', dbError });
    }
};

// Function to send password change notification email
const sendPasswordChangeEmail = async (email) => {
    console.log('sendPasswordChangeEmail function called'); // Add logging

    // Email options
    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Wachtwoord gewijzigd op Soul Connect',
        html: `Je wachtwoord is gewijzigd op Soulconnect. Als je deze wijziging niet hebt aangevraagd, neem dan onmiddellijk contact op met de ondersteuning.`,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email', error); // Add logging
            throw new Error('Fout bij het verzenden van de e-mail voor wachtwoordwijziging');
        } else {
            console.log('Password change email sent', info); // Add logging
        }
    });
};

// Function to send email change notification email
const sendEmailChangeNotification = async (oldEmail, newEmail) => {
    console.log('sendEmailChangeNotification function called'); // Add logging

    // Email options for old email
    let mailOptionsOldEmail = {
        from: process.env.EMAIL_USER,
        to: oldEmail,
        subject: 'E-mailadres gewijzigd op Soul Connect',
        html: `Je e-mailadres is gewijzigd naar ${newEmail}. Als je deze wijziging niet hebt aangevraagd, neem dan onmiddellijk contact op met de ondersteuning.`,
    };

    // Email options for new email
    let mailOptionsNewEmail = {
        from: process.env.EMAIL_USER,
        to: newEmail,
        subject: 'Welkom bij je nieuwe e-mailadres op Soul Connect',
        html: `Je hebt je e-mailadres succesvol gewijzigd naar ${newEmail}. Als je deze wijziging niet hebt aangevraagd, neem dan onmiddellijk contact op met de ondersteuning.`,
    };

    // Send email to old email
    transporter.sendMail(mailOptionsOldEmail, (error, info) => {
        if (error) {
            console.log('Error sending email to old email', error); // Add logging
            throw new Error('Fout bij het verzenden van de e-mail voor e-mailadreswijziging naar oud e-mailadres');
        } else {
            console.log('Email change notification sent to old email', info); // Add logging
        }
    });

    // Send email to new email
    transporter.sendMail(mailOptionsNewEmail, (error, info) => {
        if (error) {
            console.log('Error sending email to new email', error); // Add logging
            throw new Error('Fout bij het verzenden van de e-mail voor e-mailadreswijziging naar nieuw e-mailadres');
        } else {
            console.log('Email change notification sent to new email', info); // Add logging
        }
    });
};

const sendSubscriptionEmail = async (email, until, paid) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Subscription Created',
        html: `Your subscription has been created. It is valid until ${until}. Paid status: ${paid}.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending subscription email:', error);
        } else {
            console.log('Subscription email sent:', info);
        }
    });
};

const sendSubscriptionUpdateEmail = async (email, until, paid) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Subscription Updated',
        html: `Your subscription has been updated. It is now valid until ${until}. Paid status: ${paid}.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending subscription update email:', error);
        } else {
            console.log('Subscription update email sent:', info);
        }
    });
};

const sendSubscriptionCancelEmail = async (email) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Subscription Canceled',
        html: `Your subscription has been canceled.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending subscription cancel email:', error);
        } else {
            console.log('Subscription cancel email sent:', info);
        }
    });
};

module.exports = { sendEmail, verifyEmail, sendPasswordChangeEmail, sendEmailChangeNotification, sendSubscriptionEmail, sendSubscriptionUpdateEmail, sendSubscriptionCancelEmail };