const config = {
  events: [
    'count'
  ],
  logLevel: process.env.LOG_LEVEL || 'error',
  iotpName: 'mc-iotp',
  cloudantName: 'mc-cloudant'
}

module.exports = config
