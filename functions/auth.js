const axios = require('axios')

exports.handler = function (event, context, callback) {
  const authorizeUrl = process.env.AUTHORIZE_URL
  const headers = {
    'X-Auth-Client': process.env.CLIENT_ID,
    'X-Auth-Token': process.env.ACCESS_TOKEN,
    'content-type': 'application/json'
  }
  axios
    .post(authorizeUrl, event.body, { headers })
    .then((result) => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(result.data)
      })
    })
    .catch((error) => {
      callback(error.message)
    })
}
