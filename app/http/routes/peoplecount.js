const express = require('express')
const logger = require('winston')
const util = require('../../util')
const peoplecount = require('../../database/peoplecount')
const projections = ['day', 'hour', 'minute', 'second']

const router = express.Router()

const validate = (req, res, next) => {
  const proj = req.params.projection
  const start = req.params.start
  const end = req.params.end

  const validProj = projections.some(p => p === proj)

  if(!validProj)
    return next({status: 400, message: 'Invalid projection'})

  if(!util.dateValid(start) || !util.dateValid(end))
    return next({status: 400, message: 'Invalid date'})

  next()
}


const query = (req, res) => {
  const proj = req.params.projection
  const start = req.params.start
  const end = req.params.end

  peoplecount.read(proj, start, end)
  .then(result => {
    res.json(result)
  })
  .catch(err => {
    logger.error(err)
    res.status(500).json({message: err.message})
  })
}

router.get('/:projection/:start/:end', validate, query)

router.use((err, req, res, next) => {
  next = next || null

  res.status(err.status || 500)
  if(!err.message) return res.end()
  res.json({message: err.message})
})

module.exports = router
