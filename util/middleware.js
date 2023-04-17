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
      break
  }
  next(error)
}

module.exports = { errorHandler }
