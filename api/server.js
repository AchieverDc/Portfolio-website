require('dotenv').config();
const nodemailer = require('nodemailer');

module.exports = (req, res) => {
    if (req.method === 'POST') {
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
    } else {
        res.status(405).send('Method Not Allowed');
    }
};