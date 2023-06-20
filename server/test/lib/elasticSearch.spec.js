const { Client } = require("@elastic/elasticsearch");
const {
  getBookById,
  getBooks,
  createBook,
  updateBook,
} = require("../../src/lib/elasticSearch");

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

describe("Should call the ES Search method", () => {
  it("get book by elastic search", async () => {
    await expect(getBookById("fakeId")).resolves.toEqual(mockBookESData);
  });

  it("get list books by elastic search", async () => {
    await expect(getBooks()).resolves.toEqual(mockBookESData);
  });

  it("create book by elastic search", async () => {
    const document = mockBookESData[0]._source;
    delete document["id"];
    expect(async () => await createBook(document)).not.toThrow();
  });

  it("update book by elastic search", async () => {
      const document = mockBookESData[0]._source;
      const id = document.id;
    delete document["id"];
    expect(async () => await updateBook(id, document)).not.toThrow();
  });
});
