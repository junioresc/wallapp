const express = require("express");
const testApp = express();

testApp.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

module.exports = testApp;