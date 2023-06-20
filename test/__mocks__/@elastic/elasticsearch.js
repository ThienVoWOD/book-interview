module.exports = {
  Client: jest.fn().mockImplementation(() => {
    return {
      search: jest.fn(() => {
        return {
          hits: {
            hits: [
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
            ],
          },
        };
      }),
      indices: {
        exists: jest.fn(() => true),
        refresh: jest.fn(() => true),
      },
      index: jest.fn(() => true),
      updateByQuery: jest.fn(() => true),
    };
  }),
};
