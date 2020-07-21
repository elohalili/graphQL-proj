const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt, GraphQLNonNull } = require('graphql')

const { books } = require('./books_data')
const { libraries } = require('./libraries_data')

const app = express()

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        isbn: { type: GraphQLNonNull(GraphQLString) },
        title: { type: GraphQLNonNull(GraphQLString) },
        subtitle: { type: GraphQLNonNull(GraphQLString) },
        author: { type: GraphQLNonNull(GraphQLString) },
        published: { type: GraphQLNonNull(GraphQLString) },
        publisher: { type: GraphQLNonNull(GraphQLString) },
        pages: { type: GraphQLNonNull(GraphQLInt) },
        description: { type: GraphQLNonNull(GraphQLString) },
        website: { type: GraphQLNonNull(GraphQLString) },
    })
})

const LibraryType = new GraphQLObjectType({
    name: 'Library',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        book_ids: { type: GraphQLNonNull(GraphQLList(GraphQLString)) },
        books: {
            type: GraphQLNonNull(GraphQLList(BookType)),
            resolve: (library) => books.filter(book => library.book_ids.indexOf(book.isbn) >= 0)
        }
    })
})

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        libraries: {
            type: new GraphQLList(LibraryType),
            description: 'List of Libraries',
            resolve: () => libraries
        },
        books: {
            type: new GraphQLList(BookType),
            description: 'List of Books',
            resolve: () => books
        }
    })
})

const schema = new GraphQLSchema({
    query: RootQueryType
})

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema
}))

app.listen(3000, () => console.log('Server running...'))