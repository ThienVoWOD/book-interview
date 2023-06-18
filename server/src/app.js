const app = require("fastify")()

const { sendResponse } = require("./api/util/helper");
const { ApiProxyKey } = require("./lib/appConfig");
const loggerMiddleware = require("./lib/loggerMiddleware")

app.addHook("preHandler", (req, res, done) => {
  res.header("Cache-control", "max-age=0, private, must-revalidate");
  if (req.headers["x-api-key"] !== ApiProxyKey) {
    console.log(
      "ERROR",
      `Invalid API key or missing x-api-key in request '${req.headers["x-api-key"]}'`
    );
    res.status(403).send("Forbidden");
  }
  done();
});

app.addHook("onRequest", loggerMiddleware);

require("./lib/elasticSearch");

module.exports = async (cb) => {
  require("./api/routes/healthCheck")(app);
  require("./api/routes/book")(app);
  cb(app);
};
