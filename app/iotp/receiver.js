const log = require('winston')
const peoplecount = require('../database/peoplecount')

const handler = {
  'io.modcam.peoplecounter': data => peoplecount.create(data)
}

const handleEvent = (deviceType, deviceId, eventType, format, payload) => {
  const data = JSON.parse(payload.toString())
  data.deviceId = deviceId

  handler[eventType](data)
  .then(log.debug)
}

module.exports = {
  handleEvent
}
