const express = require("express");
const _ = express.Router();
const rootUrl = process.env.BASE_URL;
const backend = require("./backend");
const frontend = require("./frontend");

_.use("/backend", backend);
_.use("/frontend", frontend);

module.exports = _;
