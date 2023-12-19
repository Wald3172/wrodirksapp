const nodemailer = require('nodemailer');
require('dotenv').config();
const hbs = require('nodemailer-express-handlebars');
const path = require('path');
const pool = require('../config/dbConfigUser');

async function registrationMail(user, name, surname, email, department) {

	let conn;
	let adminEmail = '';

    try {
        conn = await pool.getConnection();
        const result = await conn.query("SELECT email FROM user WHERE role = 'admin'");

		result.forEach(element => {
			adminEmail += ` ${element.email};`
		});

    } catch (error) {
        console.log(error);
    } finally {
        if (conn) conn.end();
    }

	let departments = [];

	if (typeof(department) === 'string') {
		departments.push(department.charAt(0).toUpperCase() + department.slice(1))
	} else {
		department.forEach(element => {
			departments.push(element.charAt(0).toUpperCase() + element.slice(1))
		});
	}

	let transporter = nodemailer.createTransport({
		host: process.env.NODEMAILER_HOST,
		port: process.env.NODEMAILER_PORT,
		secure: false,
		auth: {
			user: process.env.NODEMAILER_AUTH_USER,
			pass: process.env.NODEMAILER_AUTH_PASSWORD
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

		from: process.env.NODEMAILER_AUTH_USER,

		to: adminEmail,
		cc: '',
		bcc: '',

		subject: `WRO Dirks App - nowe konto dla użytkownika: ${user}`,
	  	
		template: 'registrationMail',

		context: {
			user: user,
			name: name,
			surname: surname,
			email: email,
			departments: departments
		}

	};
	
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
		console.log('Email error ---> ' + error);
		} else {
		console.log('Email sent ---> ' + info.response);
		}
	});

}

module.exports = registrationMail;