const express = require('express')
const log = require('winston')
const util = require('../../util')
const peoplecount = require('../../database/peoplecount')
const projections = ['year', 'month', 'day', 'hour', 'minute']

const router = express.Router()

const validate = (req, res, next) => {
  const proj = req.params.projection
  const start = util.padIfHour(req.params.start)
  const end = util.padIfHour(req.params.end)

  const validProj = projections.some(p => p === proj)

  if(!validProj)
    return next({status: 400, message: 'Invalid projection'})

  const invalidStart = !util.dateValid(new Date(start))
  const invalidEnd = !util.dateValid(new Date(end))
  if(invalidStart || invalidEnd)
    return next({status: 400, message: 'Invalid date'})

  next()
}

const query = (req, res, next) => {
  const proj = req.params.projection
  const deviceId = req.params.deviceId
  const start = req.params.start
  const end = req.params.end

  peoplecount.read(proj, deviceId, start, end)
  .then(result => {
    res.json(result)
  })
  .catch(err => {
    const message = `Params: ${JSON.stringify(req.params)}\n\tReason: ${err.message}`
    next({status: 500, message})
  })
}

router.get('/:deviceId/:projection/:start/:end', validate, query)

router.use((err, req, res, next) => {
  next = next || null

  const status = err.status || 500
  res.status(status)

  if(status === 500) {
    log.error(err.message || 'Server error')
    return res.end()
  }

  res.json({message: err.message})
})

module.exports = router
