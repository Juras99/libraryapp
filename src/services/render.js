const axios = require('axios')

exports.homeRoutes = (req, res) => {
  axios
    .get('http://localhost:8000/api/books')
    .then(function (response) {
      res.render('index', { books: response.data })
    })
    .catch(e => {
      res.send(e)
    })
}

exports.addbook = (req, res) => {
  axios
    .get('http://localhost:8000/api/authors')
    .then(function (response) {
      res.render('addBook', { authors: response.data })
    })
    .catch(e => {
      res.send(e)
    })
}

exports.addauthor = (req, res) => {
  res.render('addAuthor')
}

exports.authors = (req, res) => {
  axios
    .get('http://localhost:8000/api/authors')
    .then(function (response) {
      res.render('authors', { authors: response.data })
    })
    .catch(e => {
      res.send(e)
    })
}

exports.updatebook = async (req, res) => {
  axios
    .get('http://localhost:8000/api/books', { params: { id: req.query.id } })
    .then(function (book) {
      axios.get('http://localhost:8000/api/authors').then(function (author) {
        res.render('updateBook', { book: book.data, authors: author.data })
      })
    })
    .catch(e => {
      res.send(e)
    })
}

exports.updateauthor = async (req, res) => {
  axios
    .get('http://localhost:8000/api/authors', { params: { id: req.query.id } })
    .then(function (author) {
      res.render('updateAuthor', { author: author.data })
    })
    .catch(e => {
      res.send(e)
    })
}
