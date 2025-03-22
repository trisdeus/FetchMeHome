const mongoose = require("mongoose");
const User = require("./userModel");
const { isEmail } = require("validator");

const emailVerificationSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    verificationCode: {
      type: String,
      required: true,
    },
    verificationStatus: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

emailVerificationSchema.statics.createVerification = async function (
  email,
  verificationCode = Math.floor(100000 + Math.random() * 900000)
) {
  if (!isEmail(email)) {
    return { error: "Invalid email address" };
  }

  const existingVerification = await EmailVerification.findOne({
    email,
    verificationStatus: "pending",
  });
  if (existingVerification) {
    return { error: "Verification already pending" };
  }

  const newVerification = new EmailVerification({
    email,
    verificationCode,
    verificationStatus: "pending",
  });
  await newVerification.save();
  return { success: "Verification code sent" };
};

emailVerificationSchema.statics.verifyEmail = async function (
  email,
  verificationCode
) {
  const emailVerification = await EmailVerification.findOne({
    email,
    verificationCode,
  });
  if (!emailVerification) {
    return { error: "Invalid verification code" };
  }

  if (emailVerification.verificationStatus === "verified") {
    return { error: "Email already verified" };
  }

  emailVerification.verificationStatus = "verified";
  await emailVerification.save();

  const user = await User.findOne({
    email: emailVerification.email,
  });
  if (!user) {
    return { error: "User not found" };
  }
  user.emailVerified = true;

  return { success: "Email verified successfully" };
};

emailVerificationSchema.statics.resendVerificationCode = async function (
  email
) {
  const emailVerification = await EmailVerification.findOne({
    email,
    verificationStatus: "pending",
  });
  if (!emailVerification) {
    return { error: "No pending verification found" };
  }

  const newVerificationCode = Math.floor(100000 + Math.random() * 900000);
  emailVerification.verificationCode = newVerificationCode;
  await emailVerification.save();
  return { success: "Verification code resent" };
};

emailVerificationSchema.statics.getVerificationStatus = async function (email) {
  const emailVerification = await EmailVerification.findOne({
    email,
  });
  if (!emailVerification) {
    return { error: "No verification found" };
  }
  return { status: emailVerification.verificationStatus };
};

emailVerificationSchema.statics.deleteVerification = async function (email) {
  const emailVerification = await EmailVerification.findOne({
    email,
  });
  if (!emailVerification) {
    return { error: "No verification found" };
  }
  await EmailVerification.deleteOne({ email });
  return { success: "Verification deleted" };
};

module.exports = mongoose.model("EmailVerification", emailVerificationSchema);
