const express = require("express");
const { addUser, loginUser } = require("../controllers/userController");
const {
  isUserExist,
  hashPassword,
  checkUser,
  checkpassword,
} = require("../middleware/userMiddleware");
const userRouter = express.Router();

userRouter.post("/signup", isUserExist, hashPassword, addUser);

userRouter.get("/login", checkUser, checkpassword, loginUser);

module.exports = userRouter;
