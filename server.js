const express = require("express");
const cors = require("cors");
const app = express();
const io = require('socket.io')(6000)
const usersRoute = require("./Routes/userRoutes");
const matcheRoute = require("./Routes/matcheRoutes");
const gameRoute = require("./Routes/gameRoute")

app.use(express.json());
app.use(cors());

app.use("/users", usersRoute);
app.use("/matches", matcheRoute);
app.use('/game',gameRoute)

app.listen("8080", () => {
  console.log("listening on port 8080");
});
