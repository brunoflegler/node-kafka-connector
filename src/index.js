const container = require('./container')

const main = async () => {
  const { app, logger } = container.cradle

  try {
    await app.start()
  } catch (error) {
    logger.fatal({
      description: 'Unexpected application behavior',
      error_message: error.message,
      error_stack: error.stack ? error.stack.split('\n') : null,
    })
  }
}

main()
