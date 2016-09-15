const logger = require('winston')
const database = require('./database')
const iotp = require('./iotp')
const server = require('./http/server')
const config = require('./config')

logger.level = config.logLevel

database.init().then(logger.info)
.then(iotp.connect).then(logger.info)
.then(iotp.subscribe).then(logger.info)
.then(server.listen).then(logger.info)

.then(() => {
  logger.info(`App is running`)
})
.catch(err => {
  logger.error(`Failed to setup application: ${err}`)
  if(err.stack) logger.error(`Stack: ${err.stack}`)
})
