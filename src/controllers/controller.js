const Book = require('../models/book')
const Author = require('../models/author')
const { populate } = require('../models/book')

// Create and save a new book

exports.createBook = (req, res) => {
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
    .save()
    .then(data => {
      console.log(data)
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

exports.findBook = (req, res) => {
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
    Book.find({})
      .populate('author')
      .then(book => {
        console.log(book)
        res.send(book)
      })
      .catch(e => res.status(500).send({ message: e.message || 'Error occured while retriving user information' }))
  }
}

// Update a book

exports.updateBook = async (req, res) => {
  try {
    console.log(req.params.id)

    const updateBook = await Book.findById(req.params.id)
    if (!updateBook) throw new Error()

    updateBook.title = req.body.title
    updateBook.author = req.body.author
    await updateBook.save()

    res.status(200).send({ book: updateBook })
  } catch (error) {
    res.status(500).send({ error })
  }
}

// Delete a book with specified id
exports.deleteBook = (req, res) => {
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

// Create and save a new author

exports.createAuthor = (req, res) => {
  console.log(req.body)
  if (Object.keys(req.body).length === 0) {
    res.status(400).send({ message: 'Content cannot be empty' })
    console.log(req.body)
    return
  }

  const author = new Author({
    name: req.body.name,
    surname: req.body.surname,
  })

  author
    .save(author)
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

// Find author

exports.findAuthor = (req, res) => {
  if (req.query.id) {
    const id = req.query.id
    Author.findById(id)
      .then(data => {
        if (!data) {
          res.status(404).send({ message: 'Not author book with id ' + id })
        } else {
          res.send(data)
        }
      })
      .catch(e => {
        res.status(500).send({ message: 'Error retrieving author with id ' + id })
      })
  } else {
    Author.find()
      .then(author => {
        res.send(author)
      })
      .catch(e => res.status(500).send({ message: e.message || 'Error occured while retrieving author information' }))
  }
}
