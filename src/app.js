const express = require('express')
const cors = require('cors')
const app = express()
const logger = require( './middlewares/loggerMiddleware' )
const { PORT } = process.env;

app.set('port', PORT || 4000 )

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(logger)

app.use('/api/send-email', require('./sendEmail/routes'))

app.use((error, req, res, next) =>{
  const { name } = error
  name === 'CastError' && res.status(400).end()
  res.status(500).end()
})

app.use((req, res) => {
  console.log(req.path)
  res.status(404).json({ error: 'Not found' })
})

module.exports = app