const mongoose = require("mongoose");
const validator = require("validator");

const flagSchema = new mongoose.Schema(
  {
    flaggedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    flagReason: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

flagSchema.createFlag = async function (userId, flagReason) {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  flagReason = validator.escape(flagReason);

  try {
    const flag = new this({
      flaggedBy: userId,
      flagReason,
    });
    await flag.save();
    return flag;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = mongoose.model("Flag", flagSchema);
