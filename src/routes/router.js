const express = require('express')
const route = new express.Router()
const services = require('../services/render')
const controller = require('../controllers/controller')

route.get('/', services.homeRoutes)

route.get('/addbook', services.addbook)

route.get('/addauthor', services.addauthor)

route.get('/authors', services.authors)

route.get('/updatebook', services.updatebook)

route.get('/updateauthor', services.updateauthor)

// API
route.post('/api/books', controller.createBook)
route.get('/api/books', controller.findBook)
route.put('/api/books/:id', controller.updateBook)
route.delete('/api/books/:id', controller.deleteBook)

route.post('/api/authors', controller.createAuthor)
route.get('/api/authors', controller.findAuthor)
route.put('/api/authors/:id', controller.updateAuthor)
route.delete('/api/authors/:id', controller.deleteAuthor)

module.exports = route
