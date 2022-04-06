const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
  },
  author: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
  },
})

module.exports = new mongoose.model('Book', bookSchema)
