const { v4: uuidv4 } = require('uuid')
const { startOfDay } = require('date-fns')

const payable = ({ database: { Op, connection }, payableModel, ENUM }) => {
  const findAll = () => {
    return payableModel.findAll({})
  }

  const updateIsAnticipatable = async () => {
    return payableModel.update(
      {
        paymentDate: new Date(),
        originalPaymentDate: connection.literal('payment_date'),
        isAnticipatable: false,
        status: ENUM.PAID,
      },
      {
        returning: true,
        where: {
          paymentDate: { [Op.gte]: new Date() },
          isAnticipatable: true,
          status: ENUM.WAITING_FUNDS,
        },
      }
    )
  }

  const create = payload => {
    const id = uuidv4()

    return payableModel.create({
      ...payload,
      id,
    })
  }

  return {
    create,
    findAll,
    updateIsAnticipatable,
  }
}

module.exports = payable
