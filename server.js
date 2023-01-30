const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8080;
const dbConnection = require("./knex/knex");
const usersRoute = require("./Routes/userRoutes");
const gamesRoute = require("./Routes/gameRoutes");

app.use(express.json());
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));

app.use("/users", usersRoute);
app.use("/game", gamesRoute);

dbConnection.migrate.latest().then((migration) => {
  if (migration) {
    console.log("connected to DB", migration);
    app.listen(PORT, () => {
      console.log("im listening");
    });
  }
});
