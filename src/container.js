const { createContainer, asFunction, asValue } = require('awilix')

const container = createContainer()

const database = require('./ports/database/postgres')
const logger = require('./ports/logger')
const app = require('./ports/app')
const config = require('./configs')
const enums = require('./configs/enums')

const { read, write, update } = require('./tasks')

const {
  payable: payableModel,
  metric: metricModel,
} = require('./ports/database/postgres/models')
const {
  payable: payableRepository,
  metric: metricRepository,
} = require('./repositories')

container.register({
  database: asFunction(database),
  logger: asFunction(logger),
  app: asFunction(app),
  config: asValue(config),
  payableModel: asFunction(payableModel),
  payableRepository: asFunction(payableRepository),
  metricModel: asFunction(metricModel),
  metricRepository: asFunction(metricRepository),
  read: asFunction(read),
  write: asFunction(write),
  update: asFunction(update),
  ENUM: asValue(enums),
})

module.exports = container
