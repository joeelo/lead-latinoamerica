const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = async () => {
	try {
		const msg = {
			to: 'josephclorenzo@gmail.com', // Change to your recipient
			from: 'joeephus@gmail.com', // Change to your verified sender
			subject: 'Sending with SendGrid is Fun',
			text: 'and easy to do anywhere, even with Node.js',
			html: '<strong>and easy to do anywhere, even with Node.js</strong>',
			mail_settings: {
				sandbox_mode: {
					enable: true
				}
			}
		}

		const response = await sgMail.send(msg);
		console.log('email sent: ', response[0].statusCode);
		return true;
	
	} catch (error) {
		console.log('error in sendMail: ', error);
	}
}

module.exports = sendMail;