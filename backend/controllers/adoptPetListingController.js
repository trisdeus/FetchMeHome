const mongoose = require("mongoose");
const AdoptPetListing = require("../models/adoptPetListingModel");

exports.getAdoptPetListings = async (req, res) => {
  try {
    const adoptPetListings = await AdoptPetListing.find();
    res.status(200).json(adoptPetListings);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.getAdoptPetListing = async (req, res) => {
  const { id } = req.params;
  try {
    const adoptPetListing = await AdoptPetListing.findById(id);
    res.status(200).json(adoptPetListing);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.getAdoptPetListingsByOwner = async (req, res) => {
  const { owner } = req.params;
  try {
    const adoptPetListings = await AdoptPetListing.find({ owner });
    res.status(200).json(adoptPetListings);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.createAdoptPetListing = async (req, res) => {
  const { title, image, description, name, age, breed, color, owner } =
    req.body;
  try {
    const newListing = await AdoptPetListing.createListing(
      title,
      image,
      description,
      name,
      age,
      breed,
      color,
      owner
    );
    res.status(201).json(newListing);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

exports.editAdoptPetListing = async (req, res) => {
  const { id, title, image, description, name, age, breed, color } = req.body;
  try {
    const updatedListing = await AdoptPetListing.editListing(
      id,
      title,
      image,
      description,
      name,
      age,
      breed,
      color
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.updateAdoptPetListingStatus = async (req, res) => {
  const { id, status } = req.body;
  try {
    const updatedListing = await AdoptPetListing.updateListingStatus(
      id,
      status
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.flagAdoptPetListing = async (req, res) => {
  const { id, flag } = req.body;
  try {
    const flaggedListing = await AdoptPetListing.flagListing(
      id,
      mongoose.Types.ObjectId(flag)
    );
    res.status(200).json(flaggedListing);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.removeAdoptPetFlag = async (req, res) => {
  const { id, flagId } = req.body;
  try {
    const listing = await AdoptPetListing.removeFlag(
      id,
      mongoose.Types.ObjectId(flagId)
    );
    res.status(200).json(listing);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.addAdoptRequest = async (req, res) => {
  const { id, requestId } = req.body;
  try {
    const listing = await AdoptPetListing.addAdoptRequest(
      id,
      mongoose.Types.ObjectId(requestId)
    );
    res.status(200).json(listing);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.removeAdoptRequest = async (req, res) => {
  const { id, requestId } = req.body;
  try {
    const listing = await AdoptPetListing.removeAdoptRequest(
      id,
      mongoose.Types.ObjectId(requestId)
    );
    res.status(200).json(listing);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.removeAdoptPetListing = async (req, res) => {
  const { id, removal } = req.params;
  try {
    await AdoptPetListing.removeListing(id, mongoose.Types.ObjectId(removal));
    res.status(200).json({ message: "Listing removed" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.deleteAdoptPetListing = async (req, res) => {
  const { id } = req.params;
  try {
    await AdoptPetListing.deleteListing(id);
    res.status(200).json({ message: "Listing deleted" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
