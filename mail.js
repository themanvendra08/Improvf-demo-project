// const nodemailer = require('nodemailer');
// require('dotenv').config();

// export async function sendEmailOtp(email, otp) {
// 	const transporter = nodemailer.createTransport({
// 		host: process.env.MAIL_HOST,
// 		port: process.env.MAIL_PORT,
// 		secure: false,
// 		requireTLS: true,
// 		auth: {
// 			user: process.env.MAIL_USER,
// 			pass: process.env.MAIL_PASSWORD,
// 		},
// 	});

// 	const mailOptions = {
// 		from: process.env.MAIL_FROM,
// 		to: email,
// 		subject: 'OTP to reset your password',
// 		text: `Your OTP is ${otp}`,
// 	};
// 	try {
// 		const info = await transporter.sendMail(mailOptions);
// 		console.log(`Email sent: Your OTP is ${otp}`);
// 		return info.response;
// 	} catch (error) {
// 		throw new Error(`Error sending email: ${error.message}`);
// 	}
// }