const peoplecount = require('../database/peoplecount')

const handler = {
  count: data => peoplecount.create(data)
}

const handleEvent = (deviceType, deviceId, eventType, format, payload) => {
  handler[eventType](payload)
  .then(console.log)
}

module.exports = {
  handleEvent
}
