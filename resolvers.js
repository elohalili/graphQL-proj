const fs = require('fs')

let { books: books_data } = require('./books_data')
let { libraries: libraries_data } = require('./libraries_data')

const book = isbn => {
    return books_data.find(b => b.isbn == isbn)
}

module.exports = {
    books() {
        return books_data
    },
    libraries() {
        return libraries_data.map(library => {
            return {
                ...library,
                books: library.book_ids.map(isbn => book(isbn))
            }
        })
    },
    createLibrary(args, req) {
        const { id, name, book_ids } = args.inputLibrary
        if (libraries_data.find(library => library.id == id)) {
            console.log('error. ID already exists')
            throw Error
        } else {
            libraries_data.push({ id, name, book_ids })
            return { id, name, book_ids }
        }
    }
}