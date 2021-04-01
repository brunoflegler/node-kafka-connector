const { Sequelize, DataTypes, Op } = require('sequelize')

const postgres = ({ config, logger }) => {
  const connection = new Sequelize(
    config.database.postgres.database,
    config.database.postgres.username,
    config.database.postgres.password,
    {
      define: {
        createdAt: 'created_at',
        timestamps: false,
        updatedAt: 'updated_at',
      },
      host: config.database.postgres.host,
      port: config.database.postgres.port,
      dialect: config.database.postgres.dialect,
      logging: false,
    }
  )

  const connect = async () => {
    try {
      logger.info({ message: 'Attempting database authentication...' })
      await connection.authenticate()
      logger.info({ message: 'Database authentication successful...' })

      return Promise.resolve()
    } catch (error) {
      logger.error({
        message: 'Cannot authenticate',
        error: error.message,
        stack: error.stack ? error.stack.split('\n') : null,
      })

      throw error
    }
  }

  return {
    connect,
    connection,
    DataTypes,
    Op,
  }
}

module.exports = postgres
