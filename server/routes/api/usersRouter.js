const express = require("express");
const userRouter = express.Router();
//User controllers
const {
  getAllUsers,
  Register,
  Login,
  editUser,
  deleteUser,
} = require("./userController");

//User routes
userRouter.get("/", getAllUsers);
userRouter.post("/register", Register);
userRouter.post("/login", Login);
userRouter.put("/:id", editUser);
userRouter.delete("/:id", deleteUser);







module.exports = userRouter;
