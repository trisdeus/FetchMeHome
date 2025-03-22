const express = require("express");
const emailVerificationRouter = express.Router();
const requireAuth = require("../middleware/requireAuth");
const {
  createEmailVerification,
  verifyEmail,
  resendVerificationCode,
  getVerificationStatus,
  deleteVerification,
} = require("../controllers/emailVerificationController");

emailVerificationRouter.use(requireAuth);

emailVerificationRouter.get("/", (req, res) => {
  res.send("Email Verification Router");
});
emailVerificationRouter.post("/", createEmailVerification);
emailVerificationRouter.post("/verify", verifyEmail);
emailVerificationRouter.post("/resend", resendVerificationCode);
emailVerificationRouter.get("/status", getVerificationStatus);
emailVerificationRouter.delete("/", deleteVerification);

module.exports = emailVerificationRouter;
