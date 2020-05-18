const { Router } = require('express')
const axios = require('axios')
const router = Router()

router.post('/', (req, res, next) => {
  const { headers, body, authorizeUrl } = req.body

  axios.post(authorizeUrl, body, { headers })
    .then((result) => {
      return res.json(result.data)
    })
    .catch((error) => {
      res.status(500).json({ error: error.message })
    })
})

module.exports = router
