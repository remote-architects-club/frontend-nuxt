// with thanks to https://github.com/vnovick/netlify-function-example/blob/master/functions/bad-words.js
// const axios = require('axios')
// const Filter = require('bad-words')
// const filter = new Filter()
// const hgeEndpoint = 'https://live-coding-netlify.herokuapp.com'

// const query = `
// mutation verifiedp($id: uuid!, $title: String!, $content: String!) {
//   update_posts(_set: { verified: true, content: $content, title: $title },
//     where:{ id: { _eq: $id } }) {
//     returning {
//       id
//     }
//   }
// }
// `

const mailjet = require('node-mailjet').connect(
  process.env.MJ_APIKEY_PUBLIC,
  process.env.MJ_APIKEY_PRIVATE
)

// exports.handler = async (event, context) => {
exports.handler = async (event) => {
  let request
  try {
    request = JSON.parse(event.body)
  } catch (e) {
    return { statusCode: 400, body: 'cannot parse hasura event' }
  }
  const { id } = request.event.data.new
  const { name } = request.table
  try {
    await mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: 'daniel@remotearchitects.club',
            Name: 'Daniel from Remote Architects Club',
          },
          To: [
            {
              Email: 'danrocha@gmail.com',
              Name: 'Daniel',
            },
          ],
          Subject: `New ${name} added`,
          TextPart: `Someone added a new [${name.toUpperCase()}] entry to Remote Architects Club. Here is the info: id[${id}]`,
          HTMLPart: `<p>Someone added a new <strong>[${name.toUpperCase()}]</strong> entry. Here is the info:</p>
          ${request}
          `,
        },
      ],
    })
    return { statusCode: 200, body: 'success' }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}
