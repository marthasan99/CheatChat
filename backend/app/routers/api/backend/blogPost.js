const express = require("express");
const _ = express.Router();

_.use("/all", (req, res) => {
  res.body("All Data Page");
});

module.exports = _;
