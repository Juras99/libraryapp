const Book = require('../../src/models/book')

// Create and save a new book

exports.create = (req, res) => {
  if (Object.keys(req.body).length === 0) {
    res.status(400).send({ message: 'Content cannot be empty' })
    console.log(req.body)
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
      console.log(req.body)
      console.log(e)
    })
}

// Retrieve all books / single book

exports.find = (req, res) => {
  Book.find()
    .then(book => {
      res.send(book)
    })
    .catch(e => res.status(500).send({ message: e.message || 'Error occured while retriving user information' }))
}

// Update a book

exports.update = (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({ message: 'Data to update can not be empty' })
  }

  const id = req.params.id
  Book.findByIdAndUpdate(id, req.body)
    .then(data => {
      if (!data) {
        res.status(404).send({ message: 'Cannot update book with ${id}.' })
      } else {
        res.send(data)
      }
    })
    .catch(e => {
      res.status(500).send({ message: 'Error Update book information' })
    })
}

// Delete a book with specified id
exports.delete = (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({ message: 'Data to delete can not be empty' })
  }

  const id = req.params.id
  Book.findByIdAndDelete(id)
    .then(data => {
      if (!data) {
        res.status(404).send({ message: 'Cannot delete book with ${id}.' })
      } else {
        res.send({ message: 'Book was deleted successfully!' })
      }
    })
    .catch(e => {
      res.status(500).send({ message: 'Error Update book information' })
    })
}
