const mongoose = require("mongoose");
const validator = require("validator");

const listingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    breed: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    flag: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ListingFlag",
        required: false,
      },
    ],
    removal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Removal",
      required: false,
    },
  },
  { timestamps: true }
);

const validateListing = (
  title,
  image,
  description,
  name,
  age,
  breed,
  color
) => {
  if (!title || !image || !name || !age || !breed || !color) {
    throw new Error("All fields are required");
  }

  if (!validator.isURL(image)) {
    throw new Error("Image must be a valid URL");
  }

  if (!/^[A-Za-z0-9\s.,!?'"-/]+$/.test(title) || title.length < 3) {
    throw new Error(
      "Title must be at least 3 characters long and contain only letters, numbers, spaces, and punctuation"
    );
  }

  if (age < 0) {
    throw new Error("Age must be a positive number");
  }

  if (!/^[A-Za-z0-9\s-]+$/.test(breed)) {
    throw new Error(
      "Breed must contain only letters, numbers, spaces, and hyphens"
    );
  }

  if (!validator.isAlpha(color.replace(/\s/g, "")) || color.length < 3) {
    throw new Error(
      "Color must be at least 3 characters long and contain only letters"
    );
  }

  return null;
};
const status = ["active", "inactive"];

listingSchema.statics.createListing = async function (
  title,
  image,
  description,
  name,
  age,
  breed,
  color,
  owner
) {
  if (!owner) {
    throw new Error("Owner ID is required");
  }

  const validationError = validateListing(
    title,
    image,
    description,
    name,
    age,
    breed,
    color
  );

  const exists = await this.findOne({ name: name, owner: owner });
  if (exists) {
    throw new Error("Listing already exists for this pet");
  }

  try {
    validateListing(title, image, description, name, age, breed, color);
  } catch (error) {
    throw new Error(error);
  }

  title = validator.escape(title);
  name = validator.escape(name);
  breed = validator.escape(breed);
  color = validator.escape(color);
  if (description) {
    description = validator.escape(description);
  }

  try {
    const listing = new this({
      title,
      image,
      description,
      name,
      age,
      breed,
      color,
      owner,
      status: "active",
    });
    await listing.save();
    return listing;
  } catch (error) {
    throw error;
  }
};

listingSchema.statics.editListing = async function (
  id,
  title,
  image,
  description,
  name,
  age,
  breed,
  color
) {
  const listing = await this.findById(id);
  if (!listing) {
    throw new Error("Listing not found");
  }

  const validationError = validateListing(
    title,
    image,
    description,
    name,
    age,
    breed,
    color
  );

  try {
    validateListing(title, image, description, name, age, breed, color);
  } catch (error) {
    throw new Error(error);
  }

  title = validator.escape(title);
  name = validator.escape(name);
  breed = validator.escape(breed);
  color = validator.escape(color);
  if (description) {
    description = validator.escape(description);
  }

  try {
    const listing = new this({
      title,
      image,
      description,
      name,
      age,
      breed,
      color,
      owner,
      status: "active",
    });
    await listing.save();
    return listing;
  } catch (error) {
    throw error;
  }
};

listingSchema.statics.updateListingStatus = async function (id, status) {
  const listing = await this.findById(id);
  if (!listing) {
    throw new Error("Listing not found");
  }

  if (!status || !status.includes(status)) {
    throw new Error("Invalid status");
  }

  try {
    listing.status = status;
    await listing.save();
    return listing;
  } catch (error) {
    throw error;
  }
};

listingSchema.statics.flagListing = async function (id, flagId) {
  const listing = await this.findById(id);
  if (!listing) {
    throw new Error("Listing not found");
  }

  try {
    listing.flag.push(flagId);
    await listing.save();
    return listing;
  } catch (error) {
    throw error;
  }
};

listingSchema.statics.removeFlag = async function (id, flagId) {
  const listing = await this.findById(id);
  if (!listing) {
    throw new Error("Listing not found");
  }

  try {
    listing.flag = listing.flag.filter((f) => f.toString() !== flagId);
    await listing.save();
    return listing;
  } catch (error) {
    throw error;
  }
};

listingSchema.statics.removeListing = async function (id, removal) {
  const listing = await this.findById(id);
  if (!listing) {
    throw new Error("Listing not found");
  }

  try {
    listing.removal = removal;
    await listing.save();
    return listing;
  } catch (error) {
    throw error;
  }
};

module.exports = mongoose.model("Pet", listingSchema);
