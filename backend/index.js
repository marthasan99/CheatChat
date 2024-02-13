require("dotenv").config();
const express = require("express");
const http = require("node:http");
const socketIo = require("socket.io");
var cors = require("cors");
const databaseConnect = require("./app/database/database");

const app = express();

const rootsServer = http.createServer(app);
app.use(cors());
const route = require("./app/routers");
const { default: workSocket } = require("./app/socket/workSocket");
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
});

app.use(route);

app.get("/", function (req, res) {
  console.log(req.body);
  res.send("Hello World");
});
