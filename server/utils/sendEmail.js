const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");
const { confirmEmailToken } = require("../utils/auth");
const dotenv = require('dotenv');
dotenv.config();

module.exports = async function sendEmail({ username, email, _id }) {
	const filePath = path.join(
		__dirname,
		"../emails/welcomeConfirmationEmail.html"
	);
	const source = fs.readFileSync(filePath, "utf-8").toString();
	const template = handlebars.compile(source);
	const link = "http://localhost:3000/confirmation/";
	const uniqueIdentifier = confirmEmailToken(username, email, _id);
	const url = link + uniqueIdentifier;
	const replacements = {
		username: username,
		mainPage: "http://localhost:3000/",
		url: url,
	};
	const htmlToSend = template(replacements);
	const transporter = nodemailer.createTransport({
		host: process.env.HOST,
		port: process.env.EMAIL_PORT,
		secure: true,
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS,
		}
	});
	const mailOptions = {
		from: "junioresc1092@gmail.com",
		to: email,
		subject: "Email confirmation to access Wall App",
		html: htmlToSend,
	};
	const info = await transporter.sendMail(mailOptions);
	console.log("Message sent: %s", info.messageId);
};
