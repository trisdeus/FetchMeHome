const mongoose = require("mongoose");
const listingSchema = require("./listingModel");

const lostPetListingSchema = new mongoose.Schema({
  ...listingSchema.obj,
  lostDate: {
    type: Date,
    required: true,
  },
  lostLocation: {
    type: String,
    required: true,
  },
  findingReports: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FindingReport",
    },
  ],
});

const validateLostPetListing = (lostDate, lostLocation) => {
  if (!lostDate || !lostLocation) {
    throw new Error("Missing required fields");
  }

  const lostDateObj = new Date(lostDate);

  if (lostDateObj > new Date()) {
    throw new Error("Lost date must be in the past");
  }

  return null;
};

lostPetListingSchema.statics.createListing = async function (
  title,
  image,
  description,
  name,
  age,
  breed,
  color,
  owner,
  lostDate,
  lostLocation
) {
  try {
    validateLostPetListing(lostDate, lostLocation);

    const listing = listingSchema.createListing(
      title,
      image,
      description,
      name,
      age,
      breed,
      color,
      owner
    );

    return await this.create({ ...listing, lostDate, lostLocation });
  } catch (error) {
    throw new Error(error);
  }
};

lostPetListingSchema.statics.editListing = async function (
  id,
  title,
  image,
  description,
  name,
  age,
  breed,
  color,
  lostDate,
  lostLocation
) {
  try {
    validateLostPetListing(lostDate, lostLocation);

    const listing = await listingSchema.editListing(
      id,
      title,
      image,
      description,
      name,
      age,
      breed,
      color
    );

    return await this.findByIdAndUpdate(
      id,
      { ...listing, lostDate, lostLocation },
      { new: true }
    );
  } catch (error) {
    throw new Error(error);
  }
};

lostPetListingSchema.statics.updateListingStatus = async function (id, status) {
  try {
    return await listingSchema.updateListingStatus(id, status);
  } catch (error) {
    throw new Error(error);
  }
};

lostPetListingSchema.statics.flagListing = async function (id, flag) {
  try {
    return await listingSchema.flagListing(id, flag);
  } catch (error) {
    throw new Error(error);
  }
};

lostPetListingSchema.statics.removeFlag = async function (id, flagId) {
  try {
    return await listingSchema.removeFlag(id, flagId);
  } catch (error) {
    throw new Error(error);
  }
};

lostPetListingSchema.statics.addFindingReport = async function (id, reportId) {
  try {
    const listing = await this.findById(id);
    if (!listing) {
      throw new Error("Listing not found");
    }

    listing.findingReports.push(reportId);
    return await listing.save();
  } catch (error) {
    throw new Error(error);
  }
};

lostPetListingSchema.statics.removeFindingReport = async function (
  id,
  reportId
) {
  try {
    const listing = await this.findById(id);
    if (!listing) {
      throw new Error("Listing not found");
    }

    listing.findingReports = listing.findingReports.filter(
      (report) => report.toString() !== reportId
    );
    return await listing.save();
  } catch (error) {
    throw new Error(error);
  }
};

lostPetListingSchema.statics.removeListing = async function (id, removal) {
  try {
    return await listingSchema.removeListing(id, removal);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = mongoose.model("LostPetListing", lostPetListingSchema);
