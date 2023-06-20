exports.bookNotFound = () => {
    return {
        statusCode: 404,
        errorCode: "BOOK_NOT_FOUND",
        errorMessage: "Book not found"
    }
}