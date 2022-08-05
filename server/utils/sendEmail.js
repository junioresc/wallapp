const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
const { confirmEmailToken } = require('../utils/auth');


export async function sendEmail({ username, email, _id }) {
    const filePath = path.join(__dirname, '../emails/welcomeConfirmationEmail.html');
    const source = fs.readFileSync(filePath, 'utf-8').toString();
    const template = handlebars.compile(source);
    const link = window.location.origin + '/confirmation/';
    const uniqueIdentifier = confirmEmailToken();
    const url = link + uniqueIdentifier;
    const replacements = {
        username: username,
        mainPage: window.location.origin,
        url: url
    };
    const htmlToSend = template(replacements)
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS
        }
    });
    const mailOptions = {
        from: 'junioresc1092@gmail.com',
        to: email,
        subject: 'Email confirmation to access Wall App',
        html: htmlToSend
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
};