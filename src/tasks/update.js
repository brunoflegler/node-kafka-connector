const update = ({ logger, payableRepository, metricRepository, ENUM }) => {
  const start = async () => {
    const execute = async () => {
      try {
        const startHrTime = global.process.hrtime()

        const [, payables] = await payableRepository.updateIsAnticipatable()

        const [seconds, nanoSeconds] = global.process.hrtime(startHrTime)
        const time = Number(seconds * 1000) + Number(nanoSeconds / 1000000)

        await metricRepository.create({
          time: time.toFixed(),
          action: ENUM.UPDATE,
        })

        logger.info({
          payable: payables.length,
          description: 'Updated payables',
        })
      } catch (error) {
        logger.error({
          description: 'Failed to update payables',
          error_message: error.message,
          error_stack: error.stack ? error.stack.split('\n') : null,
        })
      }
    }

    setInterval(execute, 3000)
  }

  return {
    start,
  }
}

module.exports = update
