const split = require("split");
const winston = require("winston");
const { createLogger, transports, format } = winston;
const { Console } = transports;
const { timestamp, printf } = format;

const { LOG_LEVEL: level, LogAppName } = require("./appConfig");
const { getContext } = require("../lib/asyncHookContext");

const logger = createLogger({
  transports: [
    new Console({
      level,
      handleExceptions: true,
      json: false,
      format: format.combine(
        timestamp(),
        printf(({ level, message, timestamp }) => {
          const { correlationId, userId } = getContext();
          return `${timestamp} | [${level.toUpperCase()}] | [${LogAppName}] | ${
            correlationId ? correlationId : ""
          } | ${userId ? userId : ""} | ${message}`;
        })
      ),
    }),
  ],
  exitOnError: false,
});
module.exports = logger;

module.exports.stream = split().on("data", function (message) {
  logger.info(message);
});
