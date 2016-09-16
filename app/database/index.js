const db = require('./db')
const peoplecount = require('./design/peoplecount.json')

const init = () => {
  return new Promise((resolve, reject) => {
    db.ensureDb()
    .then(dbMsg => {
      db.ensureDoc(peoplecount, '_design/peoplecount')
      .then(designMsg => {
        resolve(`${dbMsg}. ${designMsg}`)
      })
    })
    .catch(reject)
  })
}

module.exports = {
  init
}
