const { Readinglist } = require('../models')
const { tokenExtractor } = require('../util/middleware')

const router = require('express').Router()

router.post('/', async (req, res) => {
  const readinglists = await Readinglist.create(req.body)
  res.send(readinglists)
})

router.put('/:id', tokenExtractor, async (req, res) => {
  const readinglist = await Readinglist.findByPk(req.params.id)
  if (!(readinglist.userId === req.decodedToken.id)) {
    return res
      .status(404)
      .json({ error: 'different the login user and readinglist user' })
  }
  readinglist.read = req.body.read
  readinglist.save()
  res.json(readinglist)
})

module.exports = router
