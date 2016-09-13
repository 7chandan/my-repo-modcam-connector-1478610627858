const moment = require('moment')

const dateToArray = date => moment(date).toArray()
const arrayToDate = arr => moment(arr).format('YYYY-MM-DD HH:mm:ss')
const dateValid = date => moment(date).isValid()

module.exports = {
  dateToArray,
  arrayToDate,
  dateValid
}
