const mongoose = require("mongoose");

export const adoptionRequestSchema = new mongoose.Schema(
  {
    for: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AdoptPetListing",
      required: true,
    },
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: false,
    },
    requestStatus: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

adoptionRequestSchema.statics.createAdoptionRequest = async function (
  adoptPetListing,
  user,
  message = ""
) {
  if (!adoptPetListing || !user) {
    throw new Error("AdoptPetListing and User must be provided");
  }

  if (adoptPetListing.removal) {
    throw new Error("The listing was removed");
  }

  if (adoptPetListing.status !== "available") {
    throw new Error("The pet is not available for adoption");
  }

  if (adoptPetListing.owner.toString() === user._id.toString()) {
    throw new Error("You can't request to adopt your own pet listing");
  }

  if (await this.findOne({ for: adoptPetListing, from: user })) {
    throw new Error("You have already requested to adopt this pet listing");
  }

  return this.create({
    for: adoptPetListing,
    from: user,
    message,
    requestStatus: "pending",
  });
};

adoptionRequestSchema.statics.updateAdoptionRequest = async function (
  id,
  status
) {
  const request = await this.findById(id);

  if (!request) {
    throw new Error("AdoptionRequest must be provided");
  }

  if (
    request.requestStatus === "approved" ||
    request.requestStatus === "rejected"
  ) {
    throw new Error("AdoptionRequest is already approved or rejected");
  }

  if (status !== "approved" && status !== "rejected") {
    throw new Error("Invalid status");
  }

  try {
    request.requestStatus = status;
    return request.save();
  } catch (error) {
    throw new Error(error);
  }
};

adoptionRequestSchema.statics.editAdoptionRequest = async function (
  id,
  message
) {
  const request = await this.findById(id);

  if (!request) {
    throw new Error("AdoptionRequest must be provided");
  }

  if (
    request.requestStatus === "approved" ||
    request.requestStatus === "rejected"
  ) {
    throw new Error("AdoptionRequest is already approved or rejected");
  }

  try {
    request.message = message;
    return request.save();
  } catch (error) {
    throw new Error(error);
  }
};

adoptionRequestSchema.statics.deleteAdoptionRequest = async function (id) {
  const request = await this.findById(id);

  if (!request) {
    throw new Error("AdoptionRequest must be provided");
  }

  if (
    request.requestStatus === "approved" ||
    request.requestStatus === "rejected"
  ) {
    throw new Error("AdoptionRequest is already approved or rejected");
  }

  try {
    return request.remove();
  } catch (error) {
    throw new Error(error);
  }
};
