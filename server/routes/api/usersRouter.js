const express = require("express");
const userRouter = express.Router();
//User controllers
const {
  getUser,
  Register,
  Login,
  editUser,
  deleteUser,
  editUserPassword
} = require("./userController");

//User routes
userRouter.get("/:id", getUser);
userRouter.post("/register", Register);
userRouter.post("/login", Login);
userRouter.put("/:id/password", editUserPassword);
userRouter.put("/:id", editUser);
userRouter.delete("/:id", deleteUser);







module.exports = userRouter;
