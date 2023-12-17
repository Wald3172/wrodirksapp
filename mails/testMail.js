const nodemailer = require('nodemailer');
require('dotenv').config();
const hbs = require('nodemailer-express-handlebars');
const path = require('path');


async function testMail() {

	let user ='vyakovenko@dirks-group.de';
	let pass = '3172allIcan';

	if (!user && !pass) {
		user = process.env.NODEMAILER_AUTH_USER,
		pass = process.env.NODEMAILER_AUTH_PASSWORD
	} 


	let transporter = nodemailer.createTransport({
		host: process.env.NODEMAILER_HOST,
		port: process.env.NODEMAILER_PORT,
		secure: false,
		auth: {
			user: user,
			pass: pass
			}
	});

	transporter.use('compile', hbs({
		viewEngine: {
			extName: ".handlebars",
			partialsDir: path.resolve('./views/mails'),
			defaultLayout: false,
		  },
		viewPath: path.resolve('./views/mails'),
		extName: ".handlebars",
	}));
	
	let mailOptions = {

		priority: 'high',

		from: user,

		to: user,
		cc: '',
		bcc: '',

		subject: `TEST`,
	  	
		template: 'test'

	};
	
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
		console.log('Email error ---> ' + error);
		} else {
		console.log('Email sent ---> ' + info.response);
		}
	});

}

module.exports = testMail;