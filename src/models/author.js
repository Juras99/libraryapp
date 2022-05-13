const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  surname: {
    type: String,
    required: true,
    trim: true,
  },
})

authorSchema.virtual('book', {
  ref: 'Book',
  localField: '_id',
  foreignField: 'author',
})

const Author = mongoose.model('Author', authorSchema)

module.exports = Author
