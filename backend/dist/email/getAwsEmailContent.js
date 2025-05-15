"use strict";
// https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/ses/command/SendEmailCommand/
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getAwsEmailContent;
function getAwsEmailContent(href) {
    return {
        Destination: {
            BccAddresses: [],
            CcAddresses: [],
            ToAddresses: ['melias@leadlatinoamerica.org', 'josephclorenzo@gmail.com'],
        },
        Message: {
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: `
            A new opportunity was just uploaded
            <a class="ulink" href="http://leadgo.org/approve/${href}" target="_blank">Click here to approve program</a>. <br>
          `,
                },
                Text: {
                    Charset: 'UTF-8',
                    Data: `A link to ${href}`,
                },
            },
            Subject: {
                Charset: 'UTF-8',
                Data: 'New Opportunity',
            },
        },
        ReplyToAddresses: ['melias@leadlatinoamerica.org'],
        ReturnPath: '',
        ReturnPathArn: '',
        Source: 'melias@leadlatinoamerica.org',
        SourceArn: '',
    };
}
