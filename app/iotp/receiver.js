const peoplecount = require('../database/peoplecount')

const handleCount = data => {
  peoplecount.create(data)
  .then(console.log)
}

const handleEvent = (deviceType, deviceId, eventType, format, payload) => {
  switch(eventType) {
    case 'count':
      handleCount(payload)
  }
}

module.exports = {
  handleEvent
}
