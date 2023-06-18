const { v4: uuidv4 } = require("uuid"),
  config = require("config"),
  fs = require("fs");

const isRequired = (name) => {
  throw new Error(`environment ${name} is required`);
};

/**
 * precedence is given to the environment variable and
 * then config ( which is driven from the node_env ),
 * if it is missing from the config, an error is thrown,
 * as it is assumed that all these values are required
 * @param name
 * @param [required=true]
 * @returns {*}
 */
const extractAndSetEnv = (name, required = true) => {
  if (process.env[name] !== undefined && process.env[name] !== null) {
    return process.env[name];
  }
  if (required && !config.has(name)) {
    isRequired(name);
  }
  process.env[name] = config.has(name) ? config.get(name) : undefined;
  return process.env[name];
};

const LOG_LEVEL = extractAndSetEnv("LOG_LEVEL");

const JwtKeyId = config.has("JwtKeyId") ? config.get("JwtKeyId") : uuidv4();

// Sanity checks
// -------------
config.has("ApiProxyKey") || isRequired("ApiProxyKey");

module.exports = {
  LogAppName: "DEMO-API",
  ApiProxyKey: config.get("ApiProxyKey"),
  HttpServerPort: config.get("HttpServerPort"),
  JwtKeyId,
  LOG_LEVEL,
  ElasticIndexName: config.get("ElasticIndexName"),
};
