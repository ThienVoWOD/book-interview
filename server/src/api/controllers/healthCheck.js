const { sendResponse } = require("../util/helper");

module.exports.getHealthCheck = function getHealthCheck(_, res) {
  return sendResponse(res, 200, "success");
};
