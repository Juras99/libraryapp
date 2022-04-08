const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config({ path: '.env' })

function databaseConnect(app) {
  mongoose.connection.on('connected', () => console.log('Mongoose connected to MongoDB'))
  mongoose.connection.on('disconnected', () => console.log('Mongoose disconnected from MongoDB'))

  process.on('SIGINT', async () => {
    await mongoose.connection.close()
    process.exit(0)
  })

  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => app.emit('ready'))
    .catch(error => console.log(error.message))
}

module.exports = databaseConnect
