const emailApprovedProgram = (emailList, program) => {
  const msg = {
    to: emailList, 
    from: 'joeephus@gmail.com', 
    subject: 'A new org has been added!', 
    text: 'Checkout this new opportunity!',
    html: `
      <h1>A new opportunity has been added - ${program.name} </h1>
      ${data.partnerUrl && (
        `Their website - <a href=${data.partnerUrl} target="_blank">${data.partnerUrl}</a>`
      )}
      <p>This opportunity will be on your profile for the next 2 days! <p/>
    `
  }

  return msg
}

module.exports = { emailApprovedProgram }