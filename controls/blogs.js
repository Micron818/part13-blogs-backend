const jwt = require('jsonwebtoken')
const router = require('express').Router()
const { Blog, User } = require('../models')
const { SECRET } = require('../util/config')
const { Op } = require('sequelize')
const { sequelize } = require('../util/db')

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

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

router.get('/', async (req, res) => {
  let where = {}
  if (req.query.search) {
    const search = { [Op.substring]: req.query.search }
    where = {
      [Op.or]: [{ title: search }, { author: search }],
    }
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: { model: User, attributes: ['username', 'name'] },
    order: [['likes', 'DESC']],
    where,
  })
  res.json(blogs)
})

router.post('/', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  const blog = await Blog.create({ ...req.body, userId: user.id })
  res.json(blog)
})

router.get('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    res.json(req.blog)
  } else {
    res.status(404).end()
  }
})

router.put('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    req.blog.likes = req.body.likes
    await req.blog.save()
    res.json(req.blog)
  } else {
    res.status(404).end()
  }
})

router.delete('/:id', blogFinder, tokenExtractor, async (req, res) => {
  if (!req.blog) {
    return res.status(204).end()
  }
  if (!(req.blog.userId === req.decodedToken.id)) {
    return res
      .status(404)
      .json({ error: 'different the login user and blog owner' })
  }
  await req.blog.destroy()
  res.status(200).end()
})

module.exports = router
