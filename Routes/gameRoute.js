const express = require("express");
const Router = express.Router();
const { createRoom } = require("../controllers/gameController");

Router.post("/", createRoom);


module.exports = Router