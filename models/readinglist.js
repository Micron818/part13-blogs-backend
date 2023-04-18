const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../util/db')

class Readinglist extends Model {}

Readinglist.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
      unique: 'compositeIndex',
    },
    blogId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'blogs', key: 'id' },
      unique: 'compositeIndex',
    },
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },

  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'readinglist',
  }
)

module.exports = { Readinglist }
