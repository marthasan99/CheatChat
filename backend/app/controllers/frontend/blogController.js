const blogPost = require("../../model/blogPost");

const blogController = {
  async homeBlog(req, res) {
    const allBlog = await blogPost
      .find({})
      .populate({ path: "authId", select: "_id uname image" });
    res.send({
      success: "ok",
      data: allBlog,
    });
  },
  async singleBlogs(req, res) {
    const { id } = req.params;
    console.log("ok id", id);

    const allBlog = await blogPost.find({ _id: id }).populate({
      path: "commentId",
      select: "_id description authId",
      populate: {
        path: "authId",
        select: "_id uname image",
      },
    });
    console.log("myblog", allBlog);
    res.send({
      success: "ok",
      data: allBlog[0],
    });
  },
};
module.exports = blogController;
