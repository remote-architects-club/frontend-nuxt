// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

exports.handler = async (event) => {
  let request
  try {
    request = JSON.parse(event.body)
  } catch (e) {
    return { statusCode: 400, body: 'cannot parse hasura event' }
  }
  const { id } = request.event.data.new
  const { name } = request.table
  const msg = {
    to: 'danrocha@gmail.com',
    from: 'daniel@remotearchitects.club',
    subject: `New entry added (${name})`,
    text: 'New entry added on the remotearchitects.club.',
    html: `<p>New entry added: <strong>${name}</strong></p>
    <p>ID: ${id}</p>
    <p>Full entry:</p>
    <pre>
    ${request.event.data.new}
    </pre>
    `
  }
  sgMail.send(msg)
  return { statusCode: 200, body: 'email sent' }
}
