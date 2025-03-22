const express = require("express");
const removalRouter = express.Router();
const requireAuth = require("../middlewares/requireAuth");
const requireAdmin = require("../middlewares/requireAdmin");
const {
  removeListing,
  undoRemoval,
} = require("../controllers/removalController");

removalRouter.use(requireAuth);
removalRouter.use(requireAdmin);

removalRouter.get("/", (req, res) => {
  res.send("Removal router");
});
removalRouter.post("/", removeListing);
removalRouter.delete("/:id", undoRemoval);

module.exports = removalRouter;
