exports.sendErrorResponse = (res, statusCode, error) => {
  if (res) {
    res.status(statusCode).send(error);
  }
};

exports.sendSuccessResponse = (statusCode, data) => {
  return { statusCode, data };
};
