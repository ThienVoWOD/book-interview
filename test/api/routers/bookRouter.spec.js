const app = require('../../../src/app');
const { getBookById } = require('../../../src/lib/elasticSearch');
const apiProxyKey = process.env.API_PROXY_KEY

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
  updateBook: jest.fn(() => mockBookESData),
}));

describe( 'Book APIs', () => {
  let APP = null
  beforeAll( async ( ) => {
    return app( ( app ) => {
      APP = app
    })
  })
  it('should get list books', async () => {
    const response = await APP.inject({
      method: "GET",
      url: "/books",
      headers: { "x-api-key": apiProxyKey },
    });

    const book = JSON.parse(response.body).data[0]

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).data.length).toBe(
      mockBookESData.length
    );
    expect(book.id).toBe(mockBookESData[0]._source.id);
    expect(book.author).toBe(mockBookESData[0]._source.author);
    expect(book.title).toBe(mockBookESData[0]._source.title);
  })

  it("should get book by id", async () => {
    const response = await APP.inject({
      method: "GET",
      url: "/books/8274904b-f07b-49a2-baa9-7cdb73cb09ed",
      headers: { "x-api-key": apiProxyKey },
    });

    const book = JSON.parse(response.body).data;

    expect(response.statusCode).toBe(200);
    expect(book.id).toBe(mockBookESData[0]._source.id);
    expect(book.author).toBe(mockBookESData[0]._source.author);
    expect(book.title).toBe(mockBookESData[0]._source.title);
  });

  it("should create book", async () => {
    const payload = mockBookESData[0]._source;
    delete payload["id"];

    const response = await APP.inject({
      method: "POST",
      url: "/books",
      headers: { "x-api-key": apiProxyKey },
      payload,
    });

    expect(response.statusCode).toBe(201);
    expect(JSON.parse(response.body).data).toBe("success");
  });

  it("should update book by id", async () => {
    const payload = mockBookESData[0]._source;
    delete payload["id"];

    const response = await APP.inject({
      method: "PUT",
      url: "/books/8274904b-f07b-49a2-baa9-7cdb73cb09ed",
      headers: { "x-api-key": apiProxyKey },
      payload,
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).data).toBe("success");
  });

  it("get book by id not found", async () => {
    getBookById.mockImplementation(() => []);

    const response = await APP.inject({
      method: "GET",
      url: "/books/8274904b-f07b-49a2-baa9-7cdb73cb09ed",
      headers: { "x-api-key": apiProxyKey },
    });

    const errorResponse = JSON.parse(response.body);

    expect(response.statusCode).toBe(404);
    expect(errorResponse.errorMessage).toBe("Book not found");
    expect(errorResponse.errorCode).toBe("BOOK_NOT_FOUND");
  });

  it("update book by id not found", async () => {
    const payload = mockBookESData[0]._source;
    delete payload["id"];
    const response = await APP.inject({
      method: "PUT",
      url: "/books/8274904b-f07b-49a2-baa9-7cdb73cb09ed",
      headers: { "x-api-key": apiProxyKey },
      payload,
    });

    const errorResponse = JSON.parse(response.body);

    expect(response.statusCode).toBe(404);
    expect(errorResponse.errorMessage).toBe("Book not found");
    expect(errorResponse.errorCode).toBe("BOOK_NOT_FOUND");
  });
} );
