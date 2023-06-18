const { ElasticIndexName } = require("./appConfig");

const { Client } = require("@elastic/elasticsearch"),
  booksData = require("../../books.json"),
  client = new Client({ node: "http://localhost:9200" }),
  indexObject = { index: ElasticIndexName };

async function createDataToElastic() {
  try {
    await Promise.all(
      booksData.map((document) => {
        return client.index({
          index: ElasticIndexName,
          refresh: true,
          document,
        });
      })
    );

  console.log("Successfully to create books data into elastic search");
  } catch (error) {
    console.log(
      "ERROR",
      "Error to create books data into elastic search",
      error
    );
  }
}

async function run() {
  const exists = await client.indices.exists(indexObject);
  if (!exists) await createDataToElastic()
  await client.indices.refresh(indexObject);
}

run().catch(console.log);

exports.getBooks = async () => {
  const result = await client.search({
    index: ElasticIndexName,
    query: { match_all: {} },
    size: 1000,
  });

  return result.hits.hits;
}

exports.getBookById = async (id) => {
  const result = await client.search({
    index: ElasticIndexName,
    query: {
      match: {
        id
      },
    },
  });

  return result.hits.hits;
};

exports.createBook = async (document) => {
  await client.index({
    index: ElasticIndexName,
    refresh: true,
    document,
  });
};

exports.updateBook = async (id, body) => {
  const source = Object.keys(body).reduce((prev, key) => {
    return (prev += `ctx._source.${key}=params.${key};`);
  }, "")
  await client.updateByQuery({
    index: ElasticIndexName,
    refresh: true,
    script: {
      lang: "painless",
      source,
      params: body,
    },
    query: {
      match: {
        id,
      },
    },
  });
};


