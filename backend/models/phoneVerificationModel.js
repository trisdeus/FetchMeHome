const mongoose = require("mongoose");
const { isPhoneNumber } = require("validator");
const { User } = require("./userModel");

const phoneVerificationSchema = new mongoose.Schema(
  {
    phoneVerificationId: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    phone: {
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

phoneVerificationSchema.statics.createVerification = async function (
  phone,
  verificationCode = Math.floor(100000 + Math.random() * 900000)
) {
  if (!isPhoneNumber(phone)) {
    return { error: "Invalid phone number" };
  }

  const existingVerification = await PhoneVerification.findOne({
    phone,
    verificationStatus: "pending",
  });
  if (existingVerification) {
    return { error: "Verification already pending" };
  }

  const newVerification = new PhoneVerification({
    phone,
    verificationCode,
    verificationStatus: "pending",
  });
  await newVerification.save();
  return { success: "Verification code sent" };
};

phoneVerificationSchema.statics.verifyPhone = async function (
  phone,
  verificationCode
) {
  const phoneVerification = await PhoneVerification.findOne({
    phone,
    verificationCode,
  });
  if (!phoneVerification) {
    return { error: "Invalid verification code" };
  }

  if (phoneVerification.verificationStatus === "verified") {
    return { error: "Phone number already verified" };
  }

  phoneVerification.verificationStatus = "verified";
  await phoneVerification.save();

  const user = await User.findOne({ phone: phoneVerification.phone });
  if (!user) {
    return { error: "User not found" };
  }
  user.phoneVerified = true;
  await user.save();

  return { success: "Phone number verified" };
};

phoneVerificationSchema.statics.resendVerificationCode = async function (
  phone
) {
  const phoneVerification = await PhoneVerification.findOne({
    phone,
  });
  if (!phoneVerification) {
    return { error: "No pending verification found" };
  }
  if (phoneVerification.verificationStatus === "verified") {
    return { error: "Phone number already verified" };
  }

  const newVerificationCode = Math.floor(100000 + Math.random() * 900000);
  phoneVerification.verificationCode = newVerificationCode;
  await phoneVerification.save();
  return { success: "Verification code resent" };
};

phoneVerificationSchema.statics.getVerificationStatus = async function (phone) {
  const phoneVerification = await PhoneVerification.findOne({
    phone,
  });
  if (!phoneVerification) {
    return { error: "No pending verification found" };
  }

  return { status: phoneVerification.verificationStatus };
};

phoneVerificationSchema.statics.deleteVerification = async function (phone) {
  const phoneVerification = await PhoneVerification.findOne({
    phone,
  });
  if (!phoneVerification) {
    return { error: "No pending verification found" };
  }

  if (phoneVerification.verificationStatus === "verified") {
    return { error: "Phone number already verified" };
  }
  await PhoneVerification.deleteOne({ phone });
  return { success: "Verification deleted" };
};

module.exports = mongoose.model("PhoneVerification", phoneVerificationSchema);
