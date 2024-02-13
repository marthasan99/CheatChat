const express = require("express");
const {
  homeBlog,
  singleBlogs,
} = require("../../../controllers/frontend/blogController");

const _ = express.Router();

_.get("/all", homeBlog);
_.get("/singleblogs/:id", singleBlogs);

module.exports = _;
