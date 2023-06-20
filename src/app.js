const app = require("fastify")(),
  cors = require("@fastify/cors")

const { preHandlerMiddleware } = require("./lib/preHandlerMiddleware");
const loggerMiddleware = require("./lib/loggerMiddleware")

app.register(cors, (instance) => {
  return (req, callback) => {
    const corsOptions = {
      // This is NOT recommended for production as it enables reflection exploits
      origin: true,
    };

    // do not include CORS headers for requests from localhost
    if (/^localhost$/m.test(req.headers.origin)) {
      corsOptions.origin = false;
    }

    // callback expects two parameters: error and options
    callback(null, corsOptions);
  };
});

app.addHook("preHandler", (req, res, done) => preHandlerMiddleware(req, res, done));
app.addHook("onRequest", loggerMiddleware);

require("./lib/elasticSearch");

module.exports = (cb) => {
  require("./api/routes/healthCheckRouter")(app);
  require("./api/routes/bookRouter")(app);
  cb(app);
};
