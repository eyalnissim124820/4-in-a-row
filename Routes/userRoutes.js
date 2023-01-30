const express = require("express");
const userController = require("../controllers/userController");
const userRouter = express.Router();

const {
  checkPassword,
  isUserExist,
  hashPassword,
  loginIsUserExist,
} = require("../middleware/userMiddleware");

userRouter.post(
  "/signup",
  checkPassword,
  isUserExist,
  hashPassword,
  userController.addUser
);

userRouter.post("/login", loginIsUserExist, userController.loginUser);

module.exports = userRouter;
