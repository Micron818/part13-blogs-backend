const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch (error) {
      res.status(401).json({ error: 'token invalid:' && error.message })
    }
  } else {
    res.status(401).json({ error: 'token missing' })
  }

  next()
}

const errorHandler = (error, req, res, next) => {
  switch (error.name) {
    case 'SequelizeDatabaseError':
      return res.status(400).send({ error: error.message })
    case 'SequelizeValidationError':
      return res
        .status(400)
        .send({ error: error.errors.map((error) => error.message) })
    case 'SequelizeUniqueConstraintError':
      return res.status(400).send({
        error: error.errors.map((error) => error.message),
      })
    default:
      res.status(400).send({ error: error.message })
      break
  }
  next(error)
}

module.exports = { tokenExtractor, errorHandler }
