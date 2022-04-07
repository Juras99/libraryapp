const Book = require('../models/book')

// Create and save a new book

exports.create = (req, res) => {
  console.log(req.body)
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
      // res.send(data)
      res.redirect('/')
    })
    .catch(e => {
      res.status(500).send({
        message: e.message || 'Some error occurred while creating a create operation',
      })
    })
}

// Retrieve all books / single book

exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id
    Book.findById(id)
      .then(data => {
        if (!data) {
          res.status(404).send({ message: 'Not found book with id ' + id })
        } else {
          res.send(data)
        }
      })
      .catch(e => {
        res.status(500).send({ message: 'Eror retriving user with id ' + id })
      })
  } else {
    Book.find()
      .then(book => {
        res.send(book)
      })
      .catch(e => res.status(500).send({ message: e.message || 'Error occured while retriving user information' }))
  }
}

// Update a book

exports.update = async (req, res) => {
  try {
    console.log(req.params.id)

    const updateBook = await Book.findById(req.params.id)
    if (!updateBook) throw new Error()

    updateBook.title = req.body.title
    updateBook.author = req.body.author
    await updateBook.save()

    res.status(200).send({ book: updateBook })

    /*if (Object.keys(req.body).length === 0) {
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
      })*/
  } catch (error) {
    res.status(500).send({ error })
  }
}

// Delete a book with specified id
exports.delete = (req, res) => {
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
