const log4js = require('log4js')
const escriba = require('escriba')

const logger = ({ config }) => {
  const logType = 'console'

  const log4jsConfig = {
    appenders: {
      [logType]: {
        layout: { type: 'json' },
        type: 'stdout',
      },
    },
    categories: {
      default: {
        appenders: [logType],
        level: 'info',
      },
    },
  }

  const jsonLayout = () => logEvent => logEvent.data.join('\n')

  log4js.addLayout('json', jsonLayout)
  log4js.configure(log4jsConfig)

  const loggerEngine = log4js.getLogger(config.app.name)

  const { logger } = escriba({
    loggerEngine,
    service: config.app.name,
  })

  return logger
}

module.exports = logger
