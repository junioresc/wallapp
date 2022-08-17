const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

module.exports = async function sendEmail({ username, email }, token) {
	const filePath = path.join(
		__dirname,
		"../emails/welcomeConfirmationEmail.html"
	);
	const source = fs.readFileSync(filePath, "utf-8").toString();
	const template = handlebars.compile(source);
	const link = process.env.MAIN_PAGE + "confirmation/";
	const url = link + token;
	const replacements = {
		username: username,
		mainPage: process.env.MAIN_PAGE,
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
		},
	});
	const mailOptions = {
		from: process.env.EMAIL_USER,
		to: email,
		subject: "Email confirmation to access Wall App",
		attachments: [
			{
				filename: "fullLogo.png",
				path: __dirname + "/../../client/src/imgs/fullLogo.png",
				cid: "fullLogo",
			},
		],
		html: htmlToSend,
	};
	const info = await transporter.sendMail(mailOptions);
	console.log("Message sent: %s", info.messageId);
};
