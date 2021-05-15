const nodemailer = require('nodemailer');
const { google } = require('googleapis');


const CLIENT_ID = '509178907907-pdjbtg7je7qu78v5f5kpt509g36miar2.apps.googleusercontent.com';
const CLEINT_SECRET = 'uZFhrxnfSFI4KxCF6TAi42Wg';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04zB5l7GVykjtCgYIARAAGAQSNwF-L9IrG95Kz4cpmnDQkyGC2mqOLHkQrMAhw0_rfD37Dq6iQB3Ra1JFCYr0B5_d8SdhZ3PrfjY';

const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLEINT_SECRET,
    REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail() {
    try {
        const accessToken = await oAuth2Client.getAccessToken();

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'ahmihir11@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLEINT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken,
            },
        });

        const mailOptions = {
            from: 'SENDER NAME <ahmihir11@gmail.com>',
            to: 'alm.arham0411@gmail.com',
            subject: 'Hello from gmail using API',
            text: 'Hello from gmail email using API',
            html: '<h1>Hello from gmail email using API</h1>',
        };

        const result = await transport.sendMail(mailOptions);
        return result;
    } catch (error) {
        return error;
    }
}

sendMail()
    .then((result) => console.log('Email sent...', result))
    .catch((error) => console.log(error.message));