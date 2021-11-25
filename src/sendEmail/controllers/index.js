const sendMail = require('./nodemailer.js')

const emailCtrl = {
  async post(req, res) {
    const { name, email, message } = req.body
    !message && res.status(400).json({ status: 400, message: 'message is missing'})
    const result = await sendMail({ name, email, message })
    const { code } = result
    code
    ? res.status(500).json({ status: 500, message: 'internal error' })
    : res.status(200).json({ status: 200, message: 'success send' })
  }
}

module.exports = emailCtrl