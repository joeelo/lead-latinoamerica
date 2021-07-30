const emailFormatter = (data) => {

	let str = '';
	Object.entries(data).map(entry => str += `${entry[0]}: ${entry[1]}` + '\n');

	const msg = {
		to: 'josephclorenzo@gmail.com', // Change to your recipient
		from: 'joeephus@gmail.com', // Change to your verified sender
		subject: 'An org wants to partner with you! ',
		text: 'data: - ' + str ,
		// html: '<strong>and easy to do anywhere, even with Node.js</strong>',
		// mail_settings: {
		// 	sandbox_mode: { // sandbox mode keeps emails from sending but gives proper sendgrid responses.
		// 		enable: true
		// 	}
		// }
	}
	console.log('msg: ', msg);
	return msg;
}

module.exports = { emailFormatter }