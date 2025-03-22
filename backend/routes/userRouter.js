const express = require("express");
const userRouter = express.Router();
const requireAuth = require("../middleware/requireAuth");
const {
  getUser,
  updateUser,
  deleteUser,
  loginUser,
  signupUser,
  me,
} = require("../controllers/userController");

userRouter.get("/", (req, res) => {
  res.send("User Router");
});

userRouter.get("/:id", getUser);
userRouter.patch("/:id", requireAuth, updateUser);
userRouter.delete("/:id", requireAuth, deleteUser);
userRouter.post("/signup", signupUser);
userRouter.post("/login", loginUser);
userRouter.get("/me", requireAuth, me);

module.exports = userRouter;
