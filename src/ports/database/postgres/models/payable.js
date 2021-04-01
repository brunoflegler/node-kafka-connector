const payable = ({ database }) => {
  return database.connection.define(
    'payable',
    {
      id: {
        primaryKey: true,
        type: database.DataTypes.UUIDV4,
        allowNull: false,
      },
      amount: {
        type: database.DataTypes.NUMBER,
        allowNull: false,
      },
      paymentDate: {
        type: database.DataTypes.DATEONLY,
        allowNull: false,
        field: 'payment_date',
      },
      originalPaymentDate: {
        type: database.DataTypes.DATEONLY,
        allowNull: false,
        field: 'original_payment_date',
      },
      isAnticipatable: {
        type: database.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: 'is_anticipatable',
      },
      status: {
        type: database.DataTypes.ENUM,
        values: ['waiting_funds', 'paid'],
        defaultValue: 'waiting_funds',
        allowNull: false,
      },
    },
    {
      tableName: 'payables',
    }
  )
}

module.exports = payable
