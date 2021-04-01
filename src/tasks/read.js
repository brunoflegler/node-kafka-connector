const read = ({ logger, payableRepository, metricRepository, ENUM }) => {
  const start = async () => {
    const execute = async () => {
      try {
        const startHrTime = global.process.hrtime()

        const payables = await payableRepository.findAll()

        const [seconds, nanoSeconds] = global.process.hrtime(startHrTime)
        const time = Number(seconds * 1000) + Number(nanoSeconds / 1000000)

        await metricRepository.create({
          time: time.toFixed(),
          action: ENUM.READ,
        })

        logger.info({
          payable: payables.length,
          description: 'Find payables',
        })
      } catch (error) {
        logger.error({
          description: 'Failed to read payables',
          error_message: error.message,
          error_stack: error.stack ? error.stack.split('\n') : null,
        })
      }
    }

    setInterval(execute, 1000)
  }

  return {
    start,
  }
}

module.exports = read
