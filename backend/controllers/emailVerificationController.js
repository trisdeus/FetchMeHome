const EmailVerification = require("../models/emailVerificationModel");

exports.createEmailVerification = async (req, res) => {
  const { email } = req.body;
  const { error, success } = await EmailVerification.createVerification(email);
  if (error) {
    return res.status(400).json({ error });
  }
  return res.status(200).json({ success });
};

exports.verifyEmail = async (req, res) => {
  const { email, verificationCode } = req.body;
  const { error, success } = await EmailVerification.verifyEmail(
    email,
    verificationCode
  );
  if (error) {
    return res.status(400).json({ error });
  }
  return res.status(200).json({ success });
};

exports.resendVerificationCode = async (req, res) => {
  const { email } = req.body;
  const { error, success } = await EmailVerification.resendVerificationCode(
    email
  );
  if (error) {
    return res.status(400).json({ error });
  }
  return res.status(200).json({ success });
};

exports.getVerificationStatus = async (req, res) => {
  const { email } = req.body;
  const { error, status } = await EmailVerification.getVerificationStatus(
    email
  );
  if (error) {
    return res.status(400).json({ error });
  }
  return res.status(200).json({ status });
};

exports.deleteVerification = async (req, res) => {
  const { email } = req.body;
  const { error, success } = await EmailVerification.deleteVerification(email);
  if (error) {
    return res.status(400).json({ error });
  }
  return res.status(200).json({ success });
};
