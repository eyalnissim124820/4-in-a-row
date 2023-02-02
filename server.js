const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const usersRoute = require("./Routes/userRoutes");
const matcheRoute = require("./Routes/matcheRoutes");
const gameRoute = require("./Routes/gameRoute");
const {startGame} =require ('./users')
const cors = require("cors");
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
      usersOnRoom.push(data)
    const roomUsers = sockeIO.sockets.adapter.rooms.get(data.roomId);
    console.log("create game",roomUsers)
  });
  socket.on("joinRoom2", async(data) => {
    console.log("room befor second user",usersOnRoom)

    await socket.join(data.roomId)
      const roomUsers = sockeIO.sockets.adapter.rooms.get(data.roomId);
      usersOnRoom.push(data)
      if(roomUsers.size === 2){
        console.log("emiting game")
        sockeIO.to(data.roomId).emit("usersInRoom", {usersOnRoom : usersOnRoom, roomId:data.roomId});
        console.log("usersonroom",usersOnRoom)
        usersOnRoom = []
      // }  
    }
  
    console.log("join page room", roomUsers)
    console.log("users on room",usersOnRoom)
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

  socket.on("endGame", data =>{
    console.log("end game info",data)
    socket.to(data.roomId).emit('endGame', data);
  })

  socket.on('player-left-game', data =>{
    socket.to(data.roomId).emit('player-left-game',data)
  })
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
