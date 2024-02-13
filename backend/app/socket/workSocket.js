const workSocket = (io, socket) => {
  socket.on("some", function (info) {
    console.log("New Client Connected");
    socket.emit("Connected", "Backend Connected to Frontend");
  });
};

module.exports = workSocket;
