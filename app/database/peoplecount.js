const db = require('./db')
const util = require('../util')

const create = data => {
  data.type = 'peoplecount'
  return db.create(data)
}

const getKey = (deviceId, date, proj) => [deviceId, ...util.dateToArray(date, proj)]

const getDate = (key, proj) => {
  const dateArr = key.slice(1)
  return util.arrayToDate(dateArr, proj)
}

const read = (proj, deviceId, start, end) => {
  const name = `by_${proj}`
  const startkey = getKey(deviceId, start, proj)
  const endkey = getKey(deviceId, end, proj)

  return db.view('peoplecount', name, startkey, endkey)
  .then(result => ({
    projection: proj,
    from: getDate(startkey, proj),
    to: getDate(endkey, proj),
    items: result.rows.map(el => ({
      date: getDate(el.key, proj),
      in: el.value.in,
      out: el.value.out
    }))
  }))
}

module.exports = {
  create,
  read
}
