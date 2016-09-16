const db = require('./db')
const peoplecount = require('./design/peoplecount.json')

const buildMsg = messages => messages.reduce((p, c) => `${p}. ${c}`)

const init = () => {
  return new Promise((resolve, reject) => {
    const messages = []
    db.ensureDb()
    .then(dbMsg => {
      messages.push(dbMsg)
      return db.ensureDoc(peoplecount, '_design/peoplecount')
    })
    .then(designMsg => {
      messages.push(designMsg)
      const msg = buildMsg(messages)
      resolve(msg)
    })
    .catch(reject)
  })
}

module.exports = {
  init
}
