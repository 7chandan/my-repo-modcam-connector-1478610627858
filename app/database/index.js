const db = require('./db')
const peoplecount = require('./design/peoplecount.json')

const init = () => {
  const ensureDb = db.ensureDb()
  const ensureDesign = db.ensureDoc(peoplecount, '_design/peoplecount')

  return Promise.all([ensureDb, ensureDesign])
  .then(messages => {
    return messages.reduce((p, c) => `${p}. ${c}`)
  })
}

module.exports = {
  init
}
