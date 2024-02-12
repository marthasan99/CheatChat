const express = require("express");
const _ = express.Router();

_.use("/frontend", (req, res) => {
  res.send("Frontend Page");
});

module.exports = _;
