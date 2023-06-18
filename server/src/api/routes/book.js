const { getBooks, getBookById, createBook, updateBook } = require("../controllers/book");
const { bookCreateSchema, bookUpdateSchema } = require("../schema/book");


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