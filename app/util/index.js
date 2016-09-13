const moment = require('moment')
const cfenv = require('cfenv')
const appEnv = cfenv.getAppEnv()

const uniqueAppName = () => {
  const name = appEnv.name || 'modcam-relay'
  const ts = Date.now() 
  return `${name}-${ts}`
}

const dateToArray = date => moment(date).toArray()
const arrayToDate = arr => moment(arr).format('YYYY-MM-DD HH:mm:ss')
const dateValid = date => moment(date).isValid()

module.exports = {
  uniqueAppName,
  dateToArray,
  arrayToDate,
  dateValid
}
