const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8080;
const usersRoute = require("./Routes/userRoutes");
const matcheRoute = require("./Routes/matcheRoutes");

app.use(express.json());
app.use(cors());

app.use("/users", usersRoute);
app.use("/matches", matcheRoute);

app.listen("8080", () => {
  console.log("listening on port 8080");
});
