const mongoose = require("mongoose");
const Flag = require("./flagModel");
const Listing = require("./listingModel");

const listingFlagSchema = new mongoose.Schema(
  {
    ...Flag.schema.obj,
    listing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
      required: true,
    },
  },
  { timestamps: true }
);

listingFlagSchema.statics.flagListing = async function (
  listingId,
  userId,
  flagReason
) {
  const listing = await Listing.findById(listingId);
  if (!listing) {
    throw new Error("Listing not found");
  }

  try {
    const flag = Flag.createFlag(userId, flagReason);

    try {
      const listingFlag = new this({
        listing: listingId,
        ...flag,
      });
      await listingFlag.save();
      return listingFlag;
    } catch (error) {
      throw new Error(error);
    }
  } catch (error) {
    throw new Error(error);
  }
};

listingFlagSchema.statics.removeFlag = async function (flagId) {
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

module.exports = mongoose.model("ListingFlag", listingFlagSchema);
