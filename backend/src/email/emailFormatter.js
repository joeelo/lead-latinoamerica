const emailFormatter = (data, href) => {
  const url = `https://leadgo.org/approve/${href}`;

  const msg = {
    to: ['melias@leadlatinoamerica.org', 'josephclorenzo@gmail.com'], 
    from: 'joeephus@gmail.com', 
    subject: 'An org wants to partner with you! ',
    text: `Hey Mike, an org wants to partner with you - ${data.organization} ${url}`,
    html: `
      <h1>Hey Mike!</h1>
      <strong> An org wants to partner with you</strong> 
      <p style="text-decoration: underline;">Their bio - </p>
      <p>${data.bio}</p>
      <p>
        ${data.partnerUrl 
          ? `Their website - <a href=${data.partnerUrl} target="_blank">${data.partnerUrl}</a></p>`
          : ''
        }

      <p> This would be them on the LeadGo site - </p>
      <a href="${url}" target="_blank">Go to page</a> 

      ${data.expirationDate 
        ? `<p> The expiration date is ${data.expirationDate} </p>`
        : ''
      }

      <p>We may have to reach out for more info, but this is <b>awesome!</b></p>
    `
  };

  return msg;
};

module.exports = { emailFormatter };
