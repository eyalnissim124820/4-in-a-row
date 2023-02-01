const express = require("express");
const {
  addUser,
  loginUser,
  getTopScores,
  getUsersCurrentScore,
} = require("../controllers/userController");
const {
  isUserExist,
  hashPassword,
  checkUser,
  checkpassword,
} = require("../middleware/userMiddleware");
const userRouter = express.Router();

userRouter.post("/signup", isUserExist, hashPassword, addUser);

userRouter.post("/login", checkUser, checkpassword, loginUser);

userRouter.get("/topScores", getTopScores);

userRouter.get("/usersScore/:userId", getUsersCurrentScore);

module.exports = userRouter;
