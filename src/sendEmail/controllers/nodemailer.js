const nodemailer = require('nodemailer')
const { google } = require('googleapis')
const { OAuth2 } = google.auth
const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN, USERGMAIL, ROGER } = process.env

const oAuth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

const sendMail = async ({ name, email, message }) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken()

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: USERGMAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken
      }
    })

    const contentHTML = `
      <h1>Nodemailer API</h1>
      <p>name: ${name}</p>
      <p>email: ${email}</p>
      <p>message: ${message}</p>
    `

    const mailOptions = {
      from: `Nodemailer API <${USERGMAIL}>`,
      to: ROGER,
      subject: 'Portfolio Contact',
      html: contentHTML
    }

    return await transport.sendMail(mailOptions)
  } catch (error) {
    return error
  }
}

module.exports = sendMail