export default function getAwsEmailContent(program = {}) {
  return {
    Destination: {
      BccAddresses: [], 
      CcAddresses: [], 
      ToAddresses: [
          "melias@leadlatinoamerica.org", 
          "josephclorenzo@gmail.com"
      ]
      }, 
      Message: {
        Body: {
          Html: {
          Charset: "UTF-8", 
          Data: `
            This message body contains HTML formatting. <br>
            The test program is ${program.name || 'test-program'}
            It can, for example, contain links like this one:
              <a class="ulink" href="http://docs.aws.amazon.com/ses/latest/DeveloperGuide" target="_blank">Amazon SES Developer Guide</a>. <br>
            This is a test
          `
          }, 
          Text: {
          Charset: "UTF-8", 
          Data: "This is the email text content describing the test"
          }
        }, 
        Subject: {
          Charset: "UTF-8", 
          Data: "Test email"
        }
      }, 
      ReplyToAddresses: ['melias@leadlatinoamerica.org'], 
      ReturnPath: "", 
      ReturnPathArn: "", 
      Source: "melias@leadlatinoamerica.org", 
      SourceArn: ""
    }
}