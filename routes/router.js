const express = require('express')
const route = new express.Router()
const services = require('../server/services/render')
const controller = require('../server/controllers/controller')

route.get('/', services.homeRoutes)

route.get('/addbook', services.addbook)

route.get('/updatebook', services.updatebook)

// API
route.post('/api/books', controller.create)
route.get('/api/books', controller.find)
route.put('/api/books/:id', controller.update)
route.delete('/api/books/:id', controller.delete)

module.exports = route
