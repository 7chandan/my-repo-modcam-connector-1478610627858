const database = require('./database')
const iotp = require('./iotp')

database.init().then(console.log)
.then(iotp.connect).then(console.log)
.then(iotp.subscribe).then(console.log)

.then(() => {
  console.log(`App is running`)
})
.catch(err => {
  console.error(`Failed to setup application. Reason: ${err.message}`)
})
