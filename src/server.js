const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const ejs = require('ejs')
const morgan = require('morgan')
const Router = require('./routes/router')
const mongoose = require('mongoose')

const app = express()
const port = process.env.PORT || 8000

dotenv.config({ path: '.env' })

app.use(morgan('tiny'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const viewsPath = path.join(__dirname, './views/')
app.use(express.static(path.resolve(__dirname, '../public')))
app.use('/js', express.static(path.resolve(__dirname, '../public/js')))

app.set('view engine', 'ejs')
app.set('views', viewsPath)

app.use(Router)

app.get('*', (req, res) => {
  res.render('404', {
    errorText: 'Page not found',
  })
})

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

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  } catch (error) {
    console.error(error)
  }
}

mongodb()

app.listen(port, () => {
  console.log('Server is up on port ' + port + '.')
})
