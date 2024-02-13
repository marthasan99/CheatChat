const blogPost = require("../../model/blogPost");

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
};
module.exports = blogController;
