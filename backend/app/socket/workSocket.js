const workSocket = (io, socket) => {
  socket.on("some", function (info) {
    console.log("show some thing", info);
  });
};

module.exports = workSocket;
