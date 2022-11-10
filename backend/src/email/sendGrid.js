const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendMail = async (message) => {
  try {
    const response = await sgMail.send(message)

    return response
  } catch (error) {
    console.log('error in sendMail: ', error)
    return error 
  }
}

module.exports = sendMail
