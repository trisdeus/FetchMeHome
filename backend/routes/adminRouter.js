const express = require("express");
const adminRouter = express.Router();
const requireAuth = require("../middleware/requireAuth");
const requireAdmin = require("../middleware/requireAdmin");
const { assignAdmin, removeAdmin } = require("../controllers/adminController");

adminRouter.use(requireAuth);

adminRouter.get("/", (req, res) => {
  res.send("Admin Router");
});

adminRouter.use(requireAdmin);

adminRouter.post("/assign", assignAdmin);
adminRouter.delete("/remove/:id", removeAdmin);

module.exports = adminRouter;
