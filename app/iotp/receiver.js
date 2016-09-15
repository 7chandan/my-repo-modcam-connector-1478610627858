const logger = require('winston')
const peoplecount = require('../database/peoplecount')

const handler = {
  count: data => peoplecount.create(data)
}

const handleEvent = (deviceType, deviceId, eventType, format, payload) => {
  handler[eventType](payload)
  .then(logger.debug)
}

module.exports = {
  handleEvent
}
