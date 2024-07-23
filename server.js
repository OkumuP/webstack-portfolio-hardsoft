const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection URL and database name
const url = 'mongodb://localhost:27017';
const dbName = 'contactMessages';
let db;

// Connect to MongoDB
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) throw err;
    db = client.db(dbName);
    console.log(`Connected to database: ${dbName}`);
});

// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password'
    }
});

// Serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Handle form submission
app.post('/submit', (req, res) => {
    const { name, email, message } = req.body;

    // Save the message to the database
    const collection = db.collection('messages');
    collection.insertOne({ name, email, message, date: new Date() }, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error saving message.');
        }
        console.log('Message saved to database!');

        // Send notification email
        const mailOptions = {
            from: 'your-email@gmail.com',
            to: 'your-email@gmail.com',
            subject: 'New Contact Us Message',
            text: `Name: ${name}, Email: ${email}, Message: ${message}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                return res.status(500).send('Error sending email.');
            }
            console.log('Email sent: ' + info.response);
            res.send('Thank you for your message!');
        });
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
