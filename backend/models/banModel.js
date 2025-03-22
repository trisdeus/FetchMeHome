const mongoose = require("mongoose");
const validator = require("validator");
const User = require("./userModel");

const banSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bannedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    banReason: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

banSchema.statics.banUser = async function (userId, bannedById, banReason) {
  const user = await User.findById(userId);
  const bannedBy = await User.findById(bannedById);

  if (!user || !bannedBy) {
    throw new Error("User not found");
  }

  banReason = validator.escape(banReason);

  try {
    const ban = new this({
      user: userId,
      bannedBy: bannedById,
      banReason,
    });
    await ban.save();
    return ban;
  } catch (error) {
    throw new Error(error);
  }
};

banSchema.statics.unbanUser = async function (banId) {
  const ban = await this.findById(banId);
  if (!ban) {
    throw new Error("Ban not found");
  }

  try {
    await ban.delete();
    return ban;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = mongoose.model("Ban", banSchema);
