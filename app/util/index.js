const moment = require('moment')

const projectionMeta = unit => {
  const meta = {
    year: {
      index: 1,
      format: 'YYYY'
    },
    month: {
      index: 2,
      format: 'YYYY-MM'
    },
    day: {
      index: 2,
      format: 'YYYY-MM-DD'
    },
    hour: {
      index: 3,
      format: 'YYYY-MM-DD HH'
    },
    minute: {
      index: 4,
      format: 'YYYY-MM-DD HH:mm'
    }
  }
  return meta[unit]
}

const dateToArray = (date, unit) => {
  const meta = projectionMeta(unit)
  if(!meta) throw new Error('Invalid unit')
  return moment(date, meta.format).toArray().slice(0, meta.index)
}

const arrayToDate = (arr, unit) => {
  const format = projectionMeta(unit).format
  return moment(arr).format(format)
}

const dateValid = date => moment(date).isValid()

module.exports = {
  dateToArray,
  arrayToDate,
  dateValid
}
