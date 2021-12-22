const sgMail = require('@sendgrid/mail');
const { emailFormatter } = require('./emailFormatter');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = async (data, href) => {
  try {
    const formattedMessageAndOptions = emailFormatter(data, href);
    const response = await sgMail.send(formattedMessageAndOptions);

    return response;
  } catch (error) {
    console.log('error in sendMail: ', error);
    return error; 
  }
};

module.exports = sendMail;
