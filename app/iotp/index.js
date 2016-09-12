const cfenv = require('cfenv')
const iotf = require('ibmiotf')
const receiver = require('./receiver')
const config = require('../config')
const util = require('../util')

const appEnv = cfenv.getAppEnv()
const creds = appEnv.getServiceCreds(config.iotpName)
if(!creds) throw new Error(`credentials not found for ${config.iotpName}`)

const client = new iotf.IotfApplication({
  'org': creds.org,
  'id': util.uniqueAppName(),
  'type': 'shared',
  'auth-key': creds.apiKey,
  'auth-token': creds.apiToken
})
client.log.setLevel(config.logLevel)

const connect = () => {
  client.connect()
  return new Promise((resolve, reject) => {
    client.on('connect', () => {
      resolve('Connected to WIoTP')
    })
    client.on('error', () => {
      reject('Failed to connect to WIoTP')
    })
  })
}

const close = () => {
  client.disconnect()
}

// why no work?
// const close = client.disconnect

const subscribe = () => {
  config.events.forEach(event => {
    client.subscribeToDeviceEvents('+', '+', event)
  })
  client.on('deviceEvent', receiver.handleEvent)
  return `Subscribing to events: [${config.events}]`
}

const unsubscribe = () => {
  client.unsubscribeToDeviceEvents()
}

module.exports = {
  connect,
  close,
  subscribe,
  unsubscribe
}
