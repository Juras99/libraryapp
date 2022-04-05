const mongoose = require('mongoose')
const { Schema } = mongoose

const bookSchema = new Schema({
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
