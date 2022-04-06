const mongoose = require('mongoose')

const Book = mongoose.model('Book', {
  title: {
    type: String,
    trim: true,
    required: true,
    minlength: 2,
  },
  author: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
  },
})

module.exports = Book
