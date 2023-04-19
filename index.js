require('express-async-errors')
const express = require('express')
const { PORT } = require('./util/config')
const blogsRouter = require('./controls/blogs')
const authorsRouter = require('./controls/authors')
const usersRouter = require('./controls/users')
const readinglistsRouter = require('./controls/readinglists')
const loginRouter = require('./controls/login')
const logoutRouter = require('./controls/logout')
const { connectToDatabase } = require('./util/db')
const { errorHandler } = require('./util/middleware')

const app = express()

app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use('/api/authors', authorsRouter)
app.use('/api/users', usersRouter)
app.use('/api/readinglists', readinglistsRouter)
app.use('/api/login', loginRouter)
app.use('/api/logout', logoutRouter)

app.use(errorHandler)

const start = async () => {
  await connectToDatabase()

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
}

start()
