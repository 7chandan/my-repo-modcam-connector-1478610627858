const db = require('./db')
const peoplecount = require('./design/peoplecount.json')

const init = () => {
  return db.ensureDb()
  .then(console.log)
  .then(() => {
    return db.create(peoplecount, '_design/peoplecount')
  })
  .catch(err => {
    if(err.statusCode === 409) return 'Design document found'
    throw err
  })
}

module.exports = {
  init
}
