var Book = require('../../src/models/book')

// Create and save a new book

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: 'Content cannot be empty' })
  }

  const book = new Book({
    title: req.body.title,
    author: req.body.author,
  })

  book
    .save(book)
    .then(data => {
      req.send(data)
    })
    .catch(e => {
      req.status(500).send()
    })
}

// Retrieve all books / single book

exports.find = (req, res) => {}

// Update a book

exports.update = (req, res) => {}

// Delete a book with specified id
exports.delete = (req, res) => {}
