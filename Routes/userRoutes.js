const express = require("express");
const { addUser } = require("../controllers/userController");
const userRouter = express.Router();

// const {
//   checkPassword,
//   isUserExist,
//   hashPassword,
//   loginIsUserExist,
// } = require("../middleware/userMiddleware");

userRouter.post(
  "/signup",
  // checkPassword,
  // isUserExist,
  // hashPassword,
  addUser
);

// userRouter.post("/login", loginIsUserExist, userController.loginUser);

module.exports = userRouter;
