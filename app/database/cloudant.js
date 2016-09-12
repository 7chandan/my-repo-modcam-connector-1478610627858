const cfenv = require('cfenv')
const nano = require('nano')
const config = require('../config')

const appEnv = cfenv.getAppEnv()
const creds = appEnv.getServiceCreds(config.cloudantName)
if(!creds) throw new Error(`credentials not found for ${config.cloudantName}`)

const cloudant = nano(creds.url)

module.exports = cloudant
