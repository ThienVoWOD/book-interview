const { ApiProxyKey } = require("./appConfig");
module.exports = function apiKeyMiddleware(request, reply, done) {
  // console.log(request, "request.headers");
  if (request.headers["x-api-key"] !== ApiProxyKey) {
    console.log(
      "ERROR",
      `Invalid API key or missing x-api-key in request '${request.headers["x-api-key"]}'`
    );
    return res.status(403).send("Forbidden");
  }
  req.tms = true;
  next();
};
