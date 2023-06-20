const { ApiProxyKey } = require("./appConfig");

exports.preHandlerMiddleware = (req, res, done) => {
  res.header("Cache-control", "max-age=0, private, must-revalidate");
  if (req.headers["x-api-key"] !== ApiProxyKey) {
    console.log(
      "ERROR",
      `Invalid API key or missing x-api-key in request '${req.headers["x-api-key"]}'`
    );
    res.status(403).send("Forbidden");
  }
  done();
};
