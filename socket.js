const io = require("socket.io")(6000, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

io.on("connection", (Socket) => {
  console.log(Socket.id);
});