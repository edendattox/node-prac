const express = require("express");
const app = express();

const auth = app.use((req, res, next) => {
  console.log("Authenticating");
  next();
});

module.exports = auth;
