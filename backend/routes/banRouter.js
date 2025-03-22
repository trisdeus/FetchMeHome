const express = require("express");
const banRouter = express.Router();
const requireAuth = require("../middlewares/requireAuth");
const requireAdmin = require("../middlewares/requireAdmin");
const { banUser, unbanUser } = require("../controllers/banController");

banRouter.use(requireAuth);
banRouter.use(requireAdmin);

banRouter.get("/", (req, res) => {
  res.send("Ban router");
});
banRouter.post("/", banUser);
banRouter.delete("/:id", unbanUser);

module.exports = banRouter;
