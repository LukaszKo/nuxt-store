const { Router } = require('express')
const axios = require('axios')
const router = Router()

router.post('/', (req, res, next) => {
  const { body } = req.body
  const authorizeUrl = process.env.AUTHORIZE_URL
  const headers = {
    'X-Auth-Client': process.env.CLIENT_ID,
    'X-Auth-Token': process.env.ACCESS_TOKEN
  }

  axios
    .post(authorizeUrl, body, { headers })
    .then((result) => {
      return res.json(result.data)
    })
    .catch((error) => {
      res.status(500).json({ error: error.message })
    })
})

module.exports = router
