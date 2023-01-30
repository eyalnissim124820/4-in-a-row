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

userRouter.post("/login", checkUser, checkpassword, loginUser);

// userRouter.get("/scoreList", getUsersScoreList);
// userRouter.put("/", updateUserScore);
// userRouter.post("/login", loginUser);
// userRouter.post("/logout", logoutUser);
// userRouter.post("/login", loginIsUserExist, userController.loginUser);

module.exports = userRouter;
