require('dotenv').config()
const app = require('./app')

const port = app.get('port')

;(async () => {
  await app.listen(port)
  console.log('serve on PORT', port)
})()