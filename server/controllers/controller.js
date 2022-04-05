var Book = require('../../src/models/book')

// Create and save a new book

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: 'Content cannot be empty' })
    return
  }

  const book = new Book({
    title: req.body.title,
    author: req.body.author,
  })

  book
    .save(book)
    .then(data => {
      res.send(data)
    })
    .catch(e => {
      res.status(500).send({
        message: e.message || 'Some error occurred while creating a create operation',
      })
    })
}

// Retrieve all books / single book

exports.find = (req, res) => {}

// Update a book

exports.update = (req, res) => {}

// Delete a book with specified id
exports.delete = (req, res) => {}
