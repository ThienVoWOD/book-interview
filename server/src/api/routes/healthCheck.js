const { getHealthCheck } = require("../controllers/healthCheck");

module.exports = function(app) {
  app.get("/health-check", getHealthCheck);
}
