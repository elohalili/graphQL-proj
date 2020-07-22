const { buildSchema } = require('graphql')

module.exports = buildSchema(`
    type Book {
        isbn: String
        title: String
        subtitle: String
        author: String
        published: String
        publisher: String
        pages: Int
        description: String
        website: String
    }

    input InputLibraryData{
        id: Int!
        name: String!
        book_ids: [String!]!
    }

    type Library {
        id: Int
        name: String
        book_ids: [String]
        books: [Book]
    }

    type RootQuery {
        books: [Book]
        libraries: [Library]
    }

    type RootMutation{
        createLibrary(inputLibrary: InputLibraryData): Library!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`)