const express = require("express");
const phoneVerificationRouter = express.Router();
const requireAuth = require("../middleware/requireAuth");
const {
  verifyPhone,
  resendVerificationCode,
  createVerification,
  getVerificationStatus,
  deleteVerification,
} = require("../controllers/phoneVerificationController");

phoneVerificationRouter.use(requireAuth);

phoneVerificationRouter.get("/", (req, res) => {
  res.send("Phone Verification Router");
});
phoneVerificationRouter.post("/", createVerification);
phoneVerificationRouter.post("/verify", verifyPhone);
phoneVerificationRouter.post("/resend", resendVerificationCode);
phoneVerificationRouter.get("/status", getVerificationStatus);
phoneVerificationRouter.delete("/", deleteVerification);

module.exports = phoneVerificationRouter;
