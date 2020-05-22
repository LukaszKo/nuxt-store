const axios = require('axios')
const { jsonToGraphQLQuery } = require('json-to-graphql-query')

exports.handler = function (event, context, callback) {
  const data = JSON.parse(event.body)
  const headers = {
    Authorization: `Bearer ${data.token}`,
    'content-type': 'application/json'
  }
  const graphqlQuery = jsonToGraphQLQuery(data.query, { pretty: true })
  axios
    .post(process.env.BASE_URL, { query: graphqlQuery }, { headers })
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
