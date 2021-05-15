const nodemailer = require('nodemailer')
const {google} = require('googleapis')

const clientId = '509178907907-pdjbtg7je7qu78v5f5kpt509g36miar2.apps.googleusercontent.com'
const clientSecret = 'uZFhrxnfSFI4KxCF6TAi42Wg'
const redirectURL = 'https://developers.google.com/oauthplayground'
const refreshToken = '1//04zB5l7GVykjtCgYIARAAGAQSNwF-L9IrG95Kz4cpmnDQkyGC2mqOLHkQrMAhw0_rfD37Dq6iQB3Ra1JFCYr0B5_d8SdhZ3PrfjY'


const oAuth2client = new google.auth.OAuth2(
    clientId,
    clientSecret,
    redirectURL
    )
oAuth2client.setCredentials({refresh_Token: refreshToken})

async function sendMail () {
try{
    const accessToken = await oAuth2client.getAccessToken()

    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            type: 'OAuth2',
            user: 'ahmihir11@gmail.com',
            client: clientId,
            clientSecret: clientSecret,
            refreshToken: refreshToken,
            accessToken: accessToken

        }
    })

    const mailOptions = {
        from: 'YOURS TRULY267 <ahmihir11@gmail.com>',
        to: 'alm.arham0411@gmail.com',
        subject: 'api',
        text: 'hello from api'
    }
    const result = await transport.sendMail(mailOptions)
    return result

}catch (error){
    return error
}

}
sendMail()
.then((result) => console.log("email sent",result))
.then((error) => console.log(error.message))