const app = ({ database, read, write, update }) => {
  const start = async () => {
    await database.connect()

    await Promise.all([read.start(), write.start(), update.start()])
  }

  return {
    start,
  }
}

module.exports = app
