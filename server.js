const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const usersRoute = require("./Routes/userRoutes");
const matcheRoute = require("./Routes/matcheRoutes");
const gameRoute = require("./Routes/gameRoute");
const cors = require("cors");
const { joinRoom } = require("./users");
const { join } = require("path");
const { message } = require("statuses");
const { json } = require("body-parser");
app.use(express.json());
app.use(cors());

const sockeIO = require("socket.io")(server, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

let usersOnRoom = []
sockeIO.on("connection", (socket) => {
  console.log("connected", socket.id);

  socket.on("joinRoom1", async(data) => {
    await socket.join(data.roomId)
    if(usersOnRoom[0] != data){
      usersOnRoom.push(data)
    }
    const roomUsers = sockeIO.sockets.adapter.rooms.get(data.roomId);
    console.log("create game",roomUsers)
  });
  socket.on("joinRoom2", async(data) => {
    
    await socket.join(data.roomId)
    if(usersOnRoom[0] !=data){
      usersOnRoom.push(data)
    }
    const roomUsers = sockeIO.sockets.adapter.rooms.get(data.roomId);
    if(usersOnRoom.length == 2){
      sockeIO.to(data.roomId).emit("usersInRoom", {usersOnRoom : usersOnRoom, roomId:data.roomId});
      usersOnRoom = []
      console.log("usersonroom",usersOnRoom)
    }  
    console.log("join page room", roomUsers)
  });

  socket.on('startGame',async (data)=>{
    await socket.join(data.roomGame);
    sockeIO.to(data.roomGame).emit('welcome', "You can play")

  })

  socket.on("update", (data) => {
    const roomUsers = sockeIO.sockets.adapter.rooms.get(data.roomId);
    console.log("room in game page", roomUsers)
    socket.to(data.roomId).emit("update", data);
  });
  socket.on("disconnect", () => {
    console.log("disconnected");
  });
});

app.use("/users", usersRoute);
app.use("/matches", matcheRoute);
app.use("/game", gameRoute);

server.listen("8080", () => {
  console.log("listening on port 8080");
});
