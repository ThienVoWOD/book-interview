const { getBooks, getBookById, createBook, updateBook } = require("../controllers/bookController");
const { bookCreateSchema, bookUpdateSchema } = require("../schemas/bookSchema");


module.exports = function (app) {
    app.get("/books", getBooks);
    app.get("/books/:id", getBookById);
    app.post(
      "/books",
      {
        schema: {
          body: bookCreateSchema,
        },
      },
      createBook
    );
    app.put(
      "/books/:id",
      {
        schema: {
          body: bookUpdateSchema,
        },
      },
      updateBook
    );
};