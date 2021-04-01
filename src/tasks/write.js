const { addDays } = require('date-fns')

const write = ({ logger, payableRepository, metricRepository, ENUM }) => {
  const start = async () => {
    const execute = async () => {
      try {
        const amount = Math.floor(Math.random() * 100000000)
        const paymentDate = addDays(new Date(), Math.floor(Math.random() * 20))
        const startHrTime = global.process.hrtime()

        const payable = await payableRepository.create({
          amount,
          paymentDate,
          originalPaymentDate: paymentDate,
          isAnticitapable: true,
          status: ENUM.WAITING_FUNDS,
        })

        const [seconds, nanoSeconds] = global.process.hrtime(startHrTime)
        const time = Number(seconds * 1000) + Number(nanoSeconds / 1000000)

        await metricRepository.create({
          time: time.toFixed(),
          action: ENUM.WRITE,
        })

        logger.info({
          payable: payable.get(),
          description: 'Created payable',
        })
      } catch (error) {
        logger.error({
          description: 'Failed to create payable',
          error_message: error.message,
          error_stack: error.stack ? error.stack.split('\n') : null,
        })
      }
    }

    setInterval(execute, 50)
  }

  return {
    start,
  }
}

module.exports = write
