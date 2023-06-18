exports.bookCreateSchema = {
  type: "object",
  properties: {
    title: { type: "string", maxLength: 100 },
    author: { type: "string", maxLength: 50 },
    publishedDate: { type: "string", maxLength: 10 },
    description: { type: "string", maxLength: 1000 },
    price: { type: "number", minimum: 0 },
  },
  additionalProperties: false,
  required: ["title", "author", "publishedDate", "description", "price"],
};

exports.bookUpdateSchema = {
  type: "object",
  properties: {
    title: { type: "string", maxLength: 100 },
    author: { type: "string", maxLength: 50 },
    publishedDate: { type: "string", maxLength: 10 },
    description: { type: "string", maxLength: 1000 },
    price: { type: "number", minimum: 0 },
  },
  additionalProperties: false,
};
