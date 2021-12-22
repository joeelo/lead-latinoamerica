const emailFormatter = (data, href) => {
  let str = '';
  console.log('DATA: ', data);
  const hasHelpsWithArray = data.helpsWith.length > 0 
  const canHelpWithStr = hasHelpsWithArray 
  ? `<p>${data.helpsWith.join(' - ')}</p> `
  : ''

  Object.entries(data).map(
    (entry) => (str += `${entry[0]}: ${entry[1]}` + '\n')
  );

  const msg = {
    to: ['melias@leadlatinoamerica.org', 'josephclorenzo@gmail.com'], 
    from: 'joeephus@gmail.com', 
    subject: 'An org wants to partner with you! ',
    text: `Hey Mike, an org wants to partner with you - ${data.organization} 'https://lead-latinoamerica.vercel.app/approve/${href}`,
    html: `
		<h1>Hey Mike!</h1>
		<strong> An org wants to partner with you</strong> 
    ${canHelpWithStr}
    <p style="text-decoration: underline;">Their mission statement - </p>
    <p>${data.missionStatement}</p></br>
    <p>A short bio - ${data.bio}</p>
    <p>Their website - <a href="${data.partnerUrl}" target="_blank">${data.partnerUrl}</a></p>
		<p> This would be them on the Lead site - </p>
		<a href="https://lead-latinoamerica.vercel.app/approve/${href}" target="_blank">Go to page</a> 
    <p>We may have to reach out for more info, but this is <b>awesome!</b></p>
    `
    
  };

  return msg;
};

module.exports = { emailFormatter };
