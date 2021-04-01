const metric = ({ database }) => {
  return database.connection.define(
    'payable',
    {
      id: {
        primaryKey: true,
        type: database.DataTypes.UUIDV4,
        allowNull: false,
      },
      time: {
        type: database.DataTypes.NUMBER,
        allowNull: false,
      },
      action: {
        type: database.DataTypes.ENUM,
        values: ['read', 'write', 'update'],
        allowNull: false,
      },
    },
    {
      tableName: 'metrics',
    }
  )
}

module.exports = metric
