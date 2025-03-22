const mongoose = require("mongoose");
const validator = require("validator");
const Listing = require("./listingModel");
const User = require("./userModel");

const removalSchema = new mongoose.Schema(
  {
    listing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
      required: true,
    },
    removedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    removalReason: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

removalSchema.statics.removeListing = async function (
  listingId,
  userId,
  removalReason
) {
  const listing = await Listing.findById(listingId);
  const user = await User.findById(userId);

  if (!listing || !user) {
    throw new Error("Listing or user not found");
  }

  removalReason = validator.escape(removalReason);

  try {
    const removal = new this({
      listing: listingId,
      removedBy: userId,
      removalReason,
    });
    await removal.save();
    return removal;
  } catch (error) {
    throw new Error(error);
  }
};

removalSchema.statics.undoRemoval = async function (removalId) {
  const removal = await this.findById(removalId);
  if (!removal) {
    throw new Error("Removal not found");
  }

  try {
    await removal.delete();
    return removal;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = mongoose.model("Removal", removalSchema);
