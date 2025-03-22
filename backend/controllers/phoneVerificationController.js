const PhoneVerification = require("../models/phoneVerificationModel");

exports.createVerification = async (req, res) => {
  const { phone } = req.body;
  const { error, success } = await PhoneVerification.createVerification(phone);
  if (error) {
    return res.status(400).json({ error });
  }
  return res.status(200).json({ success });
};

exports.verifyPhone = async (req, res) => {
  const { phone, verificationCode } = req.body;
  const { error, success } = await PhoneVerification.verifyPhone(
    phone,
    verificationCode
  );
  if (error) {
    return res.status(400).json({ error });
  }
  return res.status(200).json({ success });
};

exports.resendVerificationCode = async (req, res) => {
  const { phone } = req.body;
  const { error, success } = await PhoneVerification.resendVerificationCode(
    phone
  );
  if (error) {
    return res.status(400).json({ error });
  }
  return res.status(200).json({ success });
};

exports.getVerificationStatus = async (req, res) => {
  const { phone } = req.body;
  const { error, status } = await PhoneVerification.getVerificationStatus(
    phone
  );
  if (error) {
    return res.status(400).json({ error });
  }
  return res.status(200).json({ status });
};

exports.deleteVerification = async (req, res) => {
  const { phone } = req.body;
  const { error, success } = await PhoneVerification.deleteVerification(phone);
  if (error) {
    return res.status(400).json({ error });
  }
  return res.status(200).json({ success });
};
