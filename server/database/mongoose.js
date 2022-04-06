const mongoose = require('mongoose')
const dotenv = require('dotenv')

// mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api')

async function mongodb() {
  const databaseConnect = () => {
    mongoose.connection.on('connected', () => console.log('Mongoose connected to MongoDB'))
    mongoose.connection.on('error', error => console.log(error.message))
    mongoose.connection.on('disconnected', () => console.log('Mongoose disconnected from MongoDB'))
  }

  process.on('SIGINT', async () => {
    await mongoose.connection.close()
    process.exit(0)
  })

  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}

mongodb()
