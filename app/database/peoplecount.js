const db = require('./db')

const create = data => {
  const json = JSON.parse(data.toString())
  json.type = 'peoplecount'
  return db.create(json)
}

module.exports = {
  create
}
