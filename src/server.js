const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const ejs = require('ejs')
const morgan = require('morgan')
const Router = require('./routes/router')
const databaseConnect = require('./config/databaseconnect')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
const Book = require('./models/book')

dotenv.config({ path: '.env' })

const port = process.env.PORT || 8000
const app = express()
databaseConnect(app)

app.use(
  '/graphql',
  graphqlHTTP({
    schema: buildSchema(`
    type Book {
      _id: ID!
      title: String!
      author: String!
    }

    input BookInput {
      title: String!
      author: String!
    }

    type RootQuery {
        books: [Book!]!
    }

    type RootMutation {
        addBook(bookInput: BookInput): Book
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `),
    rootValue: {
      books: () => {
        return Book.find()
          .then(books => {
            return books.map(book => {
              return { ...book._doc }
            })
          })
          .catch(e => {
            throw e
          })
      },
      addBook: args => {
        const book = new Book({
          title: args.bookInput.title,
          author: args.bookInput.author,
        })
        return book
          .save()
          .then(result => {
            console.log(result)
            return { ...result._doc }
          })
          .catch(e => {
            console.log(e)
            throw e
          })
        return book
      },
    },
    graphiql: true,
  })
)

app.use(morgan('tiny'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const viewsPath = path.join(__dirname, './views/')
app.use(express.static(path.resolve(__dirname, '../public')))
app.use('/js', express.static(path.resolve(__dirname, '../public/js')))

app.set('view engine', 'ejs')
app.set('views', viewsPath)

// Routers

app.use(Router)

app.get('*', (req, res) => {
  res.render('404', {
    errorText: 'Page not found',
  })
})

app.on('ready', () => {
  app.listen(port, () => console.log('Server is up on port ' + port + '.'))
})
