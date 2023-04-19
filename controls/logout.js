const { Session } = require('../models/session')
const { tokenExtractor } = require('../util/middleware')

const router = require('express').Router()

router.delete('/', tokenExtractor, async (req, res) => {
  await Session.destroy({
    where: { userId: req.decodedToken.id },
  })
  res.send({ result: 'logout success' }).end()
})

module.exports = router
