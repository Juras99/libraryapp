const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const ejs = require('ejs')
const morgan = require('morgan')
const Router = require('./routes/router')
const databaseConnect = require('./config/databaseconnect')
const { graphqlHTTP } = require('express-graphql')
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt, GraphQLNonNull, buildSchema } = require('graphql')
const Book = require('./models/book')

dotenv.config({ path: '.env' })

const port = process.env.PORT || 8000
const app = express()
databaseConnect(app)

const books = []

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

// GraphQL config

// const authors = []

// const BookType = new GraphQLObjectType({
//   name: 'Book',
//   description: 'This represents a book written by an author',
//   fields: () => ({
//     id: { type: GraphQLNonNull(GraphQLInt) },
//     name: { type: GraphQLNonNull(GraphQLString) },
//     authorid: { type: GraphQLNonNull(GraphQLInt) },
//     author: {
//       type: AuthorType,
//       resolve: book => {
//         return authors.find(author => author.id === book.authorId)
//       },
//     },
//   }),
// })

// const AuthorType = new GraphQLObjectType({
//   name: 'Author',
//   description: 'This represents an author of a book',
//   fields: () => ({
//     id: { type: GraphQLNonNull(GraphQLInt) },
//     name: { type: GraphQLNonNull(GraphQLString) },
//     books: {
//       type: new GraphQLList(BookType),
//       resolve: author => {
//         return books.filter(book => book.authorId === author.id)
//       },
//     },
//   }),
// })

// const RootQueryType = new GraphQLObjectType({
//   name: 'Query',
//   description: 'Root Query',
//   fields: () => ({
//     book: {
//       type: BookType,
//       description: 'A Single Book',
//       args: {
//         id: { type: GraphQLInt },
//       },
//       resolve: (parent, args) => books.find(book => book.id === args.id),
//     },
//     books: {
//       type: new GraphQLList(BookType),
//       description: 'List of books',
//       resolve: () => books,
//     },
//     authors: {
//       type: new GraphQLList(AuthorType),
//       description: 'List of authors',
//       resolve: () => authors,
//     },
//     author: {
//       type: AuthorType,
//       description: 'A Single Author',
//       args: {
//         id: { type: GraphQLInt },
//       },
//       resolve: (parent, args) => authors.find(author => author.id === args.id),
//     },
//   }),
// })

// const RootMutationType = new GraphQLObjectType({
//   name: 'Mutation',
//   description: 'Root Mutation',
//   fields: () => ({
//     addBook: {
//       type: BookType,
//       description: 'Add a book',
//       args: {
//         name: { type: GraphQLNonNull(GraphQLString) },
//         authorId: { type: GraphQLNonNull(GraphQLInt) },
//       },
//       resolve: (parent, args) => {
//         const book = new Book({ title: args.title, author: args.author })
//         book
//           .save()
//           .then(result => {
//             console.log(result)
//           })
//           .catch(err => {
//             console.log(err)
//           })
//         return book
//       },
//     },
//   }),
// })

// const schema = new GraphQLSchema({
//   query: RootQueryType,
//   mutation: RootMutationType,
// })

// app.use(
//   '/graphql',
//   expressGraphQL({
//     schema: schema,
//     graphiql: true,
//   })
// )

// End of GraphQL

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
