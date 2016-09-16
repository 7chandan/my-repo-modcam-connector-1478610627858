const log = require('winston')
const database = require('./database')
const iotp = require('./iotp')
const server = require('./http/server')
const config = require('./config')

log.level = config.logLevel

database.init().then(log.info)
.then(iotp.connect).then(log.info)
.then(iotp.subscribe).then(log.info)
.then(server.listen).then(log.info)

.then(() => {
  log.info(`App is running`)
})
.catch(err => {
  log.error(`Failed to setup application: ${err}`)
  if(err.stack) log.error(`Stack: ${err.stack}`)
})
