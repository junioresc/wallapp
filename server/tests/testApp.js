const express = require("express");

const makeTestApp = async (testdb) => {
  const app = express();
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  return app;
}

module.exports = makeTestApp;