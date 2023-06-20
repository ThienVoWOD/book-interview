const configTest = require("../config/test.json")

process.env.NODE_ENV = "test";
process.env.LOG_LEVEL = "debug";
process.env.ELASTICSEARCH_HOSTS = "http://localhost:9201";
process.env.APP_NAME = "BOOK-TEST";
process.env.API_PROXY_KEY = configTest.ApiProxyKey
