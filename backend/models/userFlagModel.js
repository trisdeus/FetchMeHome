const mongoose = require("mongoose");
const Flag = require("./flagModel");
const User = require("./userModel");

const userFlagSchema = new mongoose.Schema(
  {
    ...Flag.schema.obj,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

userFlagSchema.statics.flagUser = async function (userId, flagReason) {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  try {
    const flag = Flag.createFlag(userId, flagReason);

    try {
      const userFlag = new this({
        user: userId,
        ...flag,
      });
      await userFlag.save();
      return userFlag;
    } catch (error) {
      throw new Error(error);
    }
  } catch (error) {
    throw new Error(error);
  }
};

userFlagSchema.statics.removeFlag = async function (flagId) {
  const flag = await this.findById(flagId);
  if (!flag) {
    throw new Error("Flag not found");
  }

  try {
    await flag.delete();
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = mongoose.model("UserFlag", userFlagSchema);
