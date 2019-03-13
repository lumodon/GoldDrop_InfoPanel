require('dotenv').config({'path': 'src/.env'})
const sgMail = require('@sendgrid/mail')


function sendEmail(data) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  const msg = {
    'to': process.env.EMAIL_TO,
    'from': process.env.EMAIL_FROM,
    'subject': 'Distru Monthly Report for ' + new Date().toString().split(' ').slice(0,4).join(' '),
    'text': 'Sending test',
    'html': JSON.stringify(data, null, 2),
  }

  return sgMail.send(msg)
}

function sendText(data) {

}

module.exports = {
  sendEmail,
  sendText,
}
