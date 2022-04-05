const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema('Book', {
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
  },
  author: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
  },
})

module.exports = new mongoose.model('Book', BookSchema)
