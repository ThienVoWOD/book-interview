const { sendSuccessResponse } = require("../util/helper");

module.exports.getHealthCheck = function getHealthCheck() {
  return sendSuccessResponse(200, "OK");
};
