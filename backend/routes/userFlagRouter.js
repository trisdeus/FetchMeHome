const express = require("express");
const userFlagRouter = express.Router();
const requireAuth = require("../middlewares/requireAuth");
const { flagUser, removeFlag } = require("../controllers/userFlagController");

userFlagRouter.use(requireAuth);

userFlagRouter.get("/", (req, res) => {
  res.send("User flag router");
});
userFlagRouter.post("/", flagUser);
userFlagRouter.delete("/:id", removeFlag);

module.exports = userFlagRouter;
