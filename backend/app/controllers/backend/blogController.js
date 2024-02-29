const blogPost = require("../../model/blogPost");
const fs = require("node:fs");
const path = require("node:path");

const blogController = {
  blogCreate(req, res) {
    console.log(req.body, req.file);
    const { title, description, authId } = req.body;
    const blog = new blogPost({
      title,
      description,
      image: req.file.filename,
      authId,
    });

    blog.save().then(() => {
      console.log("blog uploaded");
    });

    res.send({
      success: "Blog Created",
    });
  },
  async blogAll(req, res) {
    const allBlog = await blogPost.find({});
    res.send({
      data: allBlog,
    });
  },
  async singleBlog(req, res) {
    const { id } = req.params;
    const allBlog = await blogPost.find({ _id: id });

    res.send({
      success: "ok",
      data: allBlog[0],
    });
  },
  async blogUpdate(req, res) {
    const { title2, description2, blogId, image_name } = req.body;

    if (image_name) {
      fs.unlinkSync("./public/images/" + image_name);
    }
    const updateBlog = await blogPost.findByIdAndUpdate(
      {
        _id: blogId,
      },
      {
        title: title2,
        description: description2,
        image: req.file.filename,
      },
      { new: true }
    );
    res.send({
      success: "update done",
      data: updateBlog,
    });

    // const allBlog = await blogPost.find({ _id: id });
  },
};
module.exports = blogController;
