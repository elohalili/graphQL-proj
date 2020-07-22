const express = require('express')
const { graphqlHTTP } = require('express-graphql')

const { books } = require('./books_data')
const { libraries } = require('./libraries_data')

const app = express()

const graphqlSchema = require('./schema')
const graphqlResolver = require('./resolvers')
app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema: graphqlSchema,
    rootValue: graphqlResolver
}))

app.listen(3000, () => console.log('Server running...'))