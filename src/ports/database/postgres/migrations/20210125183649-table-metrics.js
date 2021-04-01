'use strict'

const tableName = 'metrics'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(tableName, {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      time: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      action: {
        type: Sequelize.ENUM,
        values: ['read', 'write', 'update'],
        allowNull: false,
      },
    })
  },

  down: async queryInterface => queryInterface.dropTable(tableName),
}
