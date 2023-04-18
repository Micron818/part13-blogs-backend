const router = require('express').Router()
const { User, Blog, Team } = require('../models')
const { tokenExtractor } = require('../util/middleware')

const isAdmin = async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id)
  if (!user.admin) {
    return res.status(401).json({ error: 'operation not allowed' })
  }
  next()
}

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: [
      { model: Blog, attributes: { exclude: 'userId' } },
      { model: Team, attributes: ['name', 'id'], through: { attributes: [] } },
    ],
  })
  res.json(users)
})

router.post('/', async (req, res) => {
  const user = await User.create(req.body)
  res.json(user)
})

router.get('/:id', async (req, res) => {
  const where = {}
  if (req.query.read) {
    where.read = req.query.read
  }

  const user = await User.findByPk(req.params.id, {
    attributes: ['name', 'username'],
    include: {
      model: Blog,
      as: 'readings',
      attributes: { exclude: 'userId' },
      through: { attributes: ['read', 'id'], where },
    },
  })
  res.json(user)
})

router.delete('/:id', async (req, res) => {
  const deletedRows = await User.destroy({
    where: {
      id: req.params.id,
    },
  })
  res.json(deletedRows)
})

router.put('/:username', tokenExtractor, isAdmin, async (req, res) => {
  const updatedUser = await User.update(req.body, {
    where: {
      username: req.params.username,
    },
    returning: true,
  })
  res.json(updatedUser)
})

module.exports = router
