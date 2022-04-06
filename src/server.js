const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const ejs = require('ejs')
const morgan = require('morgan')
const Router = require('../routes/router')

const app = express()
dotenv.config({ path: '.env' })
const port = process.env.PORT || 8000

app.use(morgan('tiny'))

app.use(express.json())

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'ejs')
app.set('views', viewsPath)

app.use(express.static(publicDirectoryPath))

app.use(Router)

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    errorText: 'Page not found',
    name: 'Marcel Jurkiewicz',
  })
})

app.listen(port, () => {
  console.log('Server is up on port ' + port + '.')
})
