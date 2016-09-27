const config = {
  events: [
    'io.modcam.peoplecounter'
  ],
  logLevel: process.env.LOG_LEVEL || 'info',
  iotpName: process.env.IOTP_NAME || 'mc-iotp',
  cloudantName: process.env.CLOUDANT_NAME || 'mc-cloudant'
}

module.exports = config
