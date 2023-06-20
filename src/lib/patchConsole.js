const logger = require("./logger");

console.log = function log(...args) {
  if (
    args &&
    Array.isArray(args) &&
    args.length !== 0 &&
    args[0] === "VERBOSE"
  ) {
    logger.verbose([...args.slice(1)].join(" "));
    return;
  }
  if (args && Array.isArray(args) && args.length !== 0 && args[0] === "DEBUG") {
    logger.debug([...args.slice(1)].join(" "));
    return;
  }
  if (args && Array.isArray(args) && args.length !== 0 && args[0] === "INFO") {
    logger.info([...args.slice(1)].join(" "));
    return;
  }
  if (args && Array.isArray(args) && args.length !== 0 && args[0] === "ERROR") {
    logger.error([...args.slice(1)].join(" "));
    return;
  }
  if (args && Array.isArray(args) && args.length !== 0 && args[0] === "WARN") {
    logger.warn([...args.slice(1)].join(" "));
    return;
  }
  logger.info([...args].join(" "));
};
console.warn = function warn(...args) {
  logger.info([...args].join(" "));
};
console.info = function info(...args) {
  logger.info([...args].join(" "));
};
console.error = function error(...args) {
  logger.info([...args].join(" "));
};
