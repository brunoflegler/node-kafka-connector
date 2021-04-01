require('dotenv').config()

const postgres = require('./postgres')

module.exports = {
  app: {
    name: 'task',
  },
  database: {
    postgres,
  },
}
