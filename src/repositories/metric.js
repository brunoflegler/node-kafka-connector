const { v4: uuidv4 } = require('uuid')

const metric = ({ metricModel }) => {
  const create = payload => {
    const id = uuidv4()

    return metricModel.create({
      ...payload,
      id,
    })
  }

  return {
    create,
  }
}

module.exports = metric
