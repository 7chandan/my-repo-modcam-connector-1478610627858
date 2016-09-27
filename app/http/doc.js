const express = require('express')
const docPath = `${__dirname}/../../doc`
const fileServer = express.static(docPath)

module.exports = fileServer
