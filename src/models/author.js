const mongoose = require('mongoose')
const Book = require('./book')

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

// authorSchema.pre('remove', async function (next) {
//   const author = this

//   await Book.deleteMany({ author: author._id })

//   next()
// })

const Author = mongoose.model('Author', authorSchema)

module.exports = Author
