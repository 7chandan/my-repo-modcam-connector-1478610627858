const express = require('express')
const cfenv = require('cfenv')

const appEnv = cfenv.getAppEnv()
const app = express()

app.use('/peoplecount', require('./routes/peoplecount'))

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
