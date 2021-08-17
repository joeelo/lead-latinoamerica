const emailFormatter = (data, href) => {

	let str = '';
	Object.entries(data).map(entry => str += `${entry[0]}: ${entry[1]}` + '\n');

	const msg = {
		to: ['melias@leadlatinoamerica.org', 'josephclorenzo@gmail.com'], // Change to your recipient
		from: 'joeephus@gmail.com', // Change to your verified sender
		subject: 'An org wants to partner with you! ',
		text: `Hey Mike, an org wants to partner with you - ${str} 'https://lead-latinoamerica.vercel.app/approve/${href}`,
		html: `
		<h1>Hey Mike</h1>
		<strong> An org wants to partner with you</strong> <br/> ${str} <br/>
		<p> check them out here - </p>
		<a href="https://lead-latinoamerica.vercel.app/approve/${href}">Go to page</a> `,
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