const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  name: Sequelize.STRING,
  points: Sequelize.INTEGER
}, { timestamps: false })

module.exports = User
