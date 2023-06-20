const { getHealthCheck } = require("../controllers/healthCheckController");

module.exports = function(app) {
  app.get("/health-check", getHealthCheck);
}
