require("dotenv").config();
const express = require("express");
const http = require("node:http");
const socketIo = require("socket.io");
var cors = require("cors");
const databaseConnect = require("./app/database/database");
const fs = require("node:fs");
const app = express();
const commentModel = require("./app/model/comment");

const rootsServer = http.createServer(app);
app.use(cors());
const route = require("./app/routers");
const { default: workSocket } = require("./app/socket/workSocket");
const blogPost = require("./app/model/blogPost");
const path = require("node:path");
const port = process.env.APP_PORT;
const baseUrl = process.env.BASE_URL;

app.use(`${baseUrl}/images`, express.static(`${__dirname}/public/images/`));

app.use(express.json());
databaseConnect();

const server = app.listen(port, function () {
  console.log("Server is running");
});

const io = socketIo(server, {
  cors: {
    // origin: "http://localhost:5173/",
    origin: "*",
  },
});
io.on("connection", (socket) => {
  console.log("New Client Connected");
  socket.emit("Connected", "Backend Connected to Frontend");

  socket.on("blogDelete", async (id) => {
    console.log(id);

    let blog = await blogPost.find({ _id: id });
    if (blog[0].image) {
      fs.unlinkSync("./public/images/" + blog[0].image);
    }
    let deleteBlog = await blogPost.findByIdAndDelete({ _id: blog[0]._id });
    socket.emit("deleteBlog", deleteBlog);
  });
  socket.on("blogLike", async (data) => {
    let blog = await blogPost.find({ _id: data.blogId });

    if (blog[0].like.includes(data.authId)) {
      let likeArr = [...blog[0].like];
      likeArr.splice(likeArr.indexOf(data.authId), 1);
      let blogUpdate = await blogPost.findByIdAndUpdate(
        { _id: data.blogId },
        {
          like: likeArr,
        },
        { new: true }
      );
      socket.emit("likeBlog", blogUpdate);
    } else {
      let blogUpdate = await blogPost.findByIdAndUpdate(
        { _id: data.blogId },
        {
          $push: {
            like: data.authId,
          },
        },
        { new: true }
      );
      socket.emit("likeBlog", blogUpdate);
    }
  });
  socket.on("addComment", async ({ comment, id, authId }) => {
    console.log(comment, id);

    const commentAdd = new commentModel({
      description: comment,
      authId,
      postId: id,
    });
    commentAdd.save();

    const updateBlog = await blogPost.findByIdAndUpdate(
      { _id: id },
      { $push: { commentId: commentAdd._id } }
    );

    console.log(commentAdd);
    const allComment = await commentModel
      .find({ postId: id })
      .populate({ path: "authId", select: "_id uname image" });

    socket.emit("commentAdd", allComment);
  });
});

app.use(route);

app.get("/", function (req, res) {
  console.log(req.body);
  res.send("Hello World");
});
