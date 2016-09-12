const cfenv = require('cfenv')
const appEnv = cfenv.getAppEnv()

const uniqueAppName = () => {
  const name = appEnv.name || 'modcam-relay'
  const ts = Date.now() 
  return `${name}-${ts}`
}

module.exports = {
  uniqueAppName
}
