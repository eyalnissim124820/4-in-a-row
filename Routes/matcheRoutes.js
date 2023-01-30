const express = require("express");
const matcheRouter = express.Router();
const {
  getUsersLongStrike,
  getUsersMatcheHistory,
  addMatche,
  getUserLastScore,
} = require("../controllers/matcheController");

matcheRouter.get("/lastScore/:userId", getUserLastScore);
matcheRouter.get("/longStrike/:userId", getUsersLongStrike);
matcheRouter.get("/history/:userId", getUsersMatcheHistory);
matcheRouter.post("/", addMatche);

module.exports = matcheRouter;
