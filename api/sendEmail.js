require("dotenv").config();
const nodemailer = require("nodemailer");

// This part is not needed for serving static files
// const express = require('express');
// const app = express();

const PORT = process.env.PORT || 5000;

// Middleware for JSON parsing (if needed in other parts of your app)
// app.use(express.json());

// API route for sending emails
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: `From: ${email}\nSubject: ${subject}`,
      text: message,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send email." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
