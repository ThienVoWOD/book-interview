// jest --runTestsByPath  --detectOpenHandles ./tests/api/controllers/bookController.spec.js

const { getBooks, getBookById, createBook, updateBook } = require("../../../src/api/controllers/bookController");
const { Request, Response } = require("../../utils/httpRequestResponse");

const req = new Request();
const res = new Response();
const mockBookESData = [
  {
    _index: "books",
    _id: "O0Rfy4gBXVVl_811g-EJ",
    _score: 9.537583,
    _source: {
      id: "8274904b-f07b-49a2-baa9-7cdb73cb09ed",
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      publishedDate: "1960-07-11",
      description:
        "The story of racial injustice and the loss of innocence in the American South during the Great Depression.",
      price: 12.99,
    },
  },
];

jest.mock("../../../src/lib/elasticSearch", () => ({
  getBooks: jest.fn(() => mockBookESData),
  getBookById: jest.fn(() => mockBookESData),
  createBook: jest.fn(() => mockBookESData),
  updateBook: jest.fn(() => mockBookESData)
}));

describe("Book Controller", () => {
  it("Get all book", async () => {
    const bookDataRes = await getBooks(req, res);
    expect(bookDataRes.data).toEqual([mockBookESData[0]._source]);
  });
  it("Get book by id", async () => {
    req.params = { id: "8274904b-f07b-49a2-baa9-7cdb73cb09ed" };
    const bookDataRes = await getBookById(req, res);
    expect(bookDataRes.data).toEqual(mockBookESData[0]._source);
  });
  it("Create book", async () => {
    const body = mockBookESData[0]._source
    delete body["id"];
    req.body = body
    const bookDataRes = await createBook(req, res);
    expect(bookDataRes.data.data).toEqual("success");
  });
  it("Update book", async () => {

    const body = mockBookESData[0]._source;
    delete body["id"];
    req.body = body;
    const bookDataRes = await updateBook(req, res);
    expect(bookDataRes.data).toEqual("success");
  });
});
