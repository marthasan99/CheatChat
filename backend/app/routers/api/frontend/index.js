const express = require("express");
const _ = express.Router();
const blog = require("./blog.js");

_.use("/blog", blog);

module.exports = _;
