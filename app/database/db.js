const cloudant = require('./cloudant')
const dbName = 'events'
const db = cloudant.use(dbName)

const ensureDb = () => {
  return new Promise((resolve, reject) => {
    cloudant.db.get(dbName, (err) => {
      if(!err) return resolve('Database found')
      if(err.statusCode != 404) return reject(err) 

      // if database doesnt exist
      cloudant.db.create(dbName, (err) => {
        if(err) return reject(err)
        return resolve('Database created')
      })
    })
  }) 
}

const create = (doc, id) => {
  return new Promise((resolve, reject) => {
    db.insert(doc, id, (err, body) => {
      if(err) return reject(err)
      resolve(`Document created with id ${body.id}`)
    })
  })
}

const view = (design, name, startkey, endkey) => {
  const params = {
    group: true,
    reduce: true,
    startkey,
    endkey
  }

  // console.log(`Quering view ${name} with params ${JSON.stringify(params)}`)
  return new Promise((resolve, reject) => {
    db.view(design, name, params, (err, body) => {
      if(err) return reject(err)
      resolve(body)
    })
  })
}

module.exports = {
  ensureDb,
  create,
  view
}
