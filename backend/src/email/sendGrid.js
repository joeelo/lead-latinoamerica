const sgMail = require('@sendgrid/mail');
const { emailFormatter } = require('./emailFormatter');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = async (data) => {
	try {
		const formattedMessageAndOptions = emailFormatter(data);

		const response = await sgMail.send(formattedMessageAndOptions);
		console.log('email sent: ', response[0].statusCode);
		return true;
	} catch (error) {
		console.log('error in sendMail: ', error);
	}
}

module.exports = sendMail;