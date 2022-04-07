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

exports.updatebook = async (req, res) => {
  try {
    const { data } = await axios.get('http://localhost:8000/api/books/', { params: { id: req.query.id } })
    res.render('updateBook', { book: data })
  } catch (error) {
    res.send(error)
  }

  /*axios
    .get('http://localhost:8000/api/books', { params: { id: req.query.id } })
    .then(function (bookdata) {
      res.render('updateBook', { book: bookdata.data })
    })
    .catch(e => {
      res.send(e)
    })*/
}
