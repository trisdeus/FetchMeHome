const express = require("express");
const findingRequestRouter = express.Router();
const requireAuth = require("../middleware/requireAuth");
const {
  getFindingReportById,
  createReport,
  updateReportStatus,
  editReport,
  deleteReport,
} = require("../controllers/findingReportController");

findingRequestRouter.use(requireAuth);

findingRequestRouter.get("/:id", getFindingReportById);
findingRequestRouter.post("/", createReport);
findingRequestRouter.patch("/status", updateReportStatus);
findingRequestRouter.patch("/", editReport);
findingRequestRouter.delete("/:id", deleteReport);

module.exports = findingRequestRouter;
