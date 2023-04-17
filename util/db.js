const { Sequelize, Op } = require('sequelize')
const { DATABASE_URL } = require('./config')

const sequelize = new Sequelize(DATABASE_URL, {
  schema: 'blogs',
})

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log('connected to database')
  } catch (error) {
    console.log('failed to connect to database')
    process.exit(1)
  }
}

module.exports = { connectToDatabase, sequelize }
