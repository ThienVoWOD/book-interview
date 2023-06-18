const { getBooks, getBookById, createBook, updateBook } = require("../../lib/elasticSearch");
const { bookNotFound } = require("../error/book");
const { sendErrorResponse, sendSuccessResponse } = require("../util/helper");
const { v4: uuidv4 } = require("uuid");


exports.getBooks = async (_, res) => {
  try {
    const data = await getBooks();
    const books = data.map((e) => e._source);
    return sendSuccessResponse(200, books);
  } catch (error) {
    console.log("ERROR", "Get Books Error ::", error);
    return res.status(500).send(error);
  }
};

exports.getBookById = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await getBookById(id);
        if (book.length === 0) {
          console.log("ERROR", `Book by id[${id}] not found`);
          return res.status(404).send(bookNotFound());
        }
        return sendSuccessResponse(200, book[0]._source);
    } catch (error) {
        console.log("ERROR", "Get Book By Id Error ::", error);
        return res.status(500).send(error);
    }
};

exports.createBook = async (req, res) => {
    try {
        const body = req.body;

        await createBook({...body, id: uuidv4()});
        return sendSuccessResponse(201, "success");
    } catch (error) {
        console.log("ERROR", "Create Book Error ::", error);
        return res.status(500).send(error);
    }
};

exports.updateBook = async (req, res) => {
  try {
    const body = req.body;
    const { id } = req.params;
    await this.getBookById(req, res);
    await updateBook(id, body);
    return sendSuccessResponse(200, "success");
  } catch (error) {
    console.log("ERROR", "Update Book Error ::", error);
    return res.status(500).send(error);
  };
};
