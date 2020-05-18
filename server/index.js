const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const AuthRouter = require('./routes/auth')

const app = express()
const port = 4200

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(cors())

app.use('/api/auth', AuthRouter)

app.get('/', (req, res) => {
  res.send('Hello')
})

app.listen(port, () => {
  console.log(`Server is running on localhost:${port}`)
})
