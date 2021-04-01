'use strict'

const tableName = 'payables'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(tableName, {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      payment_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      original_payment_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      is_anticipatable: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      status: {
        type: Sequelize.ENUM,
        values: ['waiting_funds', 'paid'],
        defaultValue: 'waiting_funds',
        allowNull: false,
      },
    })
  },

  down: async queryInterface => queryInterface.dropTable(tableName),
}
