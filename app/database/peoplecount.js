const db = require('./db')
const util = require('../util')

const create = data => {
  const json = JSON.parse(data.toString())
  json.type = 'peoplecount'
  return db.create(json)
}

const read = (proj, start, end) => {
  const name = `by_${proj}`
  const startkey = util.dateToArray(start, proj)
  const endkey = util.dateToArray(end, proj)

  return db.view('peoplecount', name, startkey, endkey)
  .then(result => ({
    projection: proj,
    from: util.arrayToDate(startkey, proj),
    to: util.arrayToDate(endkey, proj),
    items: result.rows.map(el => ({
      date: util.arrayToDate(el.key, proj),
      in: el.value.in,
      out: el.value.out
    }))
  }))
}

module.exports = {
  create,
  read
}
