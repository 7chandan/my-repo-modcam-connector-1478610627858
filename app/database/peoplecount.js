const db = require('./db')
const util = require('../util')

const create = data => {
  const json = JSON.parse(data.toString())
  json.type = 'peoplecount'
  return db.create(json)
}

const read = (projection, start, end) => {
  const name = `by_${projection}`
  const startkey = util.dateToArray(start)
  const endkey = util.dateToArray(end)

  return db.view('peoplecount', name, startkey, endkey)
  .then(result => ({
    projection,
    items: result.rows.map(el => ({
      date: util.arrayToDate(el.key),
      in: el.value.in,
      out: el.value.out
    }))
  }))
}

module.exports = {
  create,
  read
}
