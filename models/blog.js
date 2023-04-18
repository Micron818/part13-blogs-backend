const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')

class Blog extends Model {}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    year: {
      type: DataTypes.INTEGER,
      // validate: {
      //   min: {
      //     args: 1991,
      //     msg: `the value less 1991, Validation min on year failed`,
      //   },
      //   max: new Date().getFullYear(),
      // },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'blog',
    validate: {
      yearBetween() {
        const currentYear = new Date().getFullYear()
        if (this.year < 1991 || this.year > currentYear) {
          throw new Error(
            `the request year ${this.year} is valid, must between 1991 and ${currentYear}!`
          )
        }
      },
    },
  }
)

module.exports = { Blog }
