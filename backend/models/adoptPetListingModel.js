const mongoose = require("mongoose");
const listingSchema = require("./listingModel");

const adoptPetListingSchema = new mongoose.Schema({
  ...listingSchema.obj,
  adoptRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AdoptionRequest",
    },
  ],
});

adoptPetListingSchema.statics.createListing = async function (
  title,
  image,
  description,
  name,
  age,
  breed,
  color,
  owner
) {
  try {
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
    return await this.create({ ...listing });
  } catch (error) {
    throw new Error(error);
  }
};

adoptPetListingSchema.statics.editListing = async function (
  id,
  title,
  image,
  description,
  name,
  age,
  breed,
  color
) {
  try {
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
    return await this.findByIdAndUpdate(id, { ...listing }, { new: true });
  } catch (error) {
    throw new Error(error);
  }
};

adoptPetListingSchema.statics.updateListingStatus = async function (
  id,
  status
) {
  try {
    const listing = await listingSchema.updateListingStatus(id, status);
    return await this.findByIdAndUpdate(id, { ...listing }, { new: true });
  } catch (error) {
    throw new Error(error);
  }
};

adoptPetListingSchema.statics.flagListing = async function (id, flag) {
  try {
    const listing = await listingSchema.flagListing(id, flag);
    return await this.findByIdAndUpdate(id, { ...listing }, { new: true });
  } catch (error) {
    throw new Error(error);
  }
};

adoptPetListingSchema.statics.removeFlag = async function (id, flagId) {
  try {
    const listing = await listingSchema.removeFlag(id, flagId);
    return await this.findByIdAndUpdate(id, { ...listing }, { new: true });
  } catch (error) {
    throw new Error(error);
  }
};

adoptPetListingSchema.statics.addAdoptRequest = async function (id, requestId) {
  try {
    const listing = await this.findById(id);
    if (!listing) {
      throw new Error("Listing not found");
    }

    listing.adoptRequests.push(requestId);
    await listing.save();
    return listing;
  } catch (error) {
    throw new Error(error);
  }
};

adoptPetListingSchema.statics.removeAdoptRequest = async function (
  id,
  requestId
) {
  try {
    const listing = await this.findById(id);
    if (!listing) {
      throw new Error("Listing not found");
    }

    listing.adoptRequests = listing.adoptRequests.filter(
      (r) => r.toString() !== requestId
    );
    await listing.save();
    return listing;
  } catch (error) {
    throw new Error(error);
  }
};

adoptPetListingSchema.statics.removeListing = async function (id, removal) {
  try {
    const listing = await listingSchema.removeListing(id, removal);
    return await this.findByIdAndUpdate(id, { ...listing }, { new: true });
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = mongoose.model("AdoptPetListing", adoptPetListingSchema);
