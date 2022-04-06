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
  res.render('addBook')
}

exports.updatebook = (req, res) => {
  res.render('updateBook')
}
