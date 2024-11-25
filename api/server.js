const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Your existing email handler
require('dotenv').config();
const nodemailer = require('nodemailer');

app.post('/submit', (req, res) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        },
        pool: true,
        maxConnections: 5,
        maxMessages: 10,
    });

    const mailOptions = {
        from: req.body.email,
        to: process.env.EMAIL_USER,
        subject: `From: ${req.body.email}\nPhone: ${req.body.phone}\nInterest: ${req.body.interest}`,
        text: req.body.message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('error');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('success');
        }
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
