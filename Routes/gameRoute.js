const express = require("express");
const Router = express.Router();
const { createRoom } = require("../controllers/gameController");

Router.get("/", createRoom);


module.exports = Router