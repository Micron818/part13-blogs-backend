const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Session extends Model {}

Session.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    token: DataTypes.STRING,
  },
  {
    sequelize,
    underscored: true,
    // modelName: 'session',
    updatedAt: false,
  }
)

module.exports = { Session }
