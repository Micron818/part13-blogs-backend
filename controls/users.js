const router = require('express').Router()

const { User, Blog } = require('../models')

const userFinder = async (req, res, next) => {
  req.user = await User.findByPk(req.params.id)
  next()
}

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: { model: Blog, attributes: { exclude: 'userId' } },
  })
  res.json(users)
})

router.post('/', async (req, res) => {
  const user = await User.create(req.body)
  res.json(user)
})

router.get('/:id', userFinder, async (req, res) => {
  if (req.user) {
    res.json(req.user)
  } else {
    res.status(404).end()
  }
})

router.delete('/:id', userFinder, async (req, res) => {
  if (req.user) {
    await req.user.destroy()
  }
  res.status(204).end()
})

router.put('/:username', async (req, res) => {
  const updatedUser = await User.update(req.body, {
    where: {
      username: req.params.username,
    },
    returning: true,
  })
  res.json(updatedUser)
})

module.exports = router
