const emailApprovedProgram = (emailList, program) => {
  const msg = {
    to: emailList, 
    from: 'joeephus@gmail.com', 
    subject: 'A new opportunity has been added!', 
    text: 'Checkout this new opportunity!',
    html: `
      <h1>A new opportunity has been added - ${program.name} </h1>
      ${program.partnerUrl && (
        `Their website - <a href=${program.partnerUrl} target="_blank">${program.partnerUrl}</a>`
      )}
    `
  }

  return msg
}

module.exports = { emailApprovedProgram }