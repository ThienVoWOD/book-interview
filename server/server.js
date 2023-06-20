#!/usr/bin/env node
require("dotenv").config();

const { HttpServerPort } = require("./src/lib/appConfig");
require("./src/lib/patchConsole");

require("fs").writeFileSync("server.pid", process.pid.toString(), {
  encoding: "utf-8",
});

const app = require("./src/app")

app((application) => {
  application.listen({ port: HttpServerPort }, (err, address) => {
    if (err) console.log(err);
    console.log("Server up and listening on", address);
  });
});
