const express = require('express')
const cfenv = require('cfenv')
const allowCors = require('./allowCors')

const appEnv = cfenv.getAppEnv()
const app = express()

app.use(allowCors)
app.use('/peoplecounter', require('./routes/peoplecount'))

const listen = () => {
  return new Promise((resolve) => {
    const server = app.listen(appEnv.port, () => {
      const addr = server.address()
      resolve(`Server running on: http://${addr.address}:${addr.port}`)
    })
  })
}

module.exports = {
  listen
}
