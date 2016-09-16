const db = require('./db')
const peoplecount = require('./design/peoplecount.json')

const buildMsg = msgs => msgs.reduce((p, c) => `${p}. ${c}`)

const init = () => {
  const msgs = []
  return db.ensureDb()
  .then(msg => {
    msgs.push(msg)
    return db.ensureDoc(peoplecount, '_design/peoplecount')
  })
  .then(msg => {
    msgs.push(msg)
    return buildMsg(msgs)
  })
}

module.exports = {
  init
}
