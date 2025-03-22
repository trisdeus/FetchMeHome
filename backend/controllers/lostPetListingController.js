const lostPetListing = require("../models/lostPetListingModel");

exports.getLostPetListings = async (req, res) => {
  try {
    const lostPetListings = await lostPetListing.find();
    res.status(200).json(lostPetListings);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.getLostPetListing = async (req, res) => {
  const { id } = req.params;
  try {
    const lostPetListing = await lostPetListing.findById(id);
    res.status(200).json(lostPetListing);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.getLostPetListingByOwner = async (req, res) => {
  const { owner } = req.params;
  try {
    const lostPetListings = await lostPetListing.find({ owner });
    res.status(200).json(lostPetListings);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.createLostPetListing = async (req, res) => {
  const { title, image, description, name, age, breed, color, owner } =
    req.body;
  try {
    const newListing = await lostPetListing.createListing(
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

exports.editLostPetListing = async (req, res) => {
  const { id, title, image, description, name, age, breed, color } = req.body;
  try {
    const updatedListing = await lostPetListing.editListing(
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
    res.status(409).json({ message: error.message });
  }
};

exports.updateLostPetListingStatus = async (req, res) => {
  const { id, status } = req.body;
  try {
    const updatedListing = await lostPetListing.updateListingStatus(id, status);
    res.status(200).json(updatedListing);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

exports.flagLostPetListing = async (req, res) => {
  const { id, flag } = req.body;
  try {
    const updatedListing = await lostPetListing.flagListing(
      id,
      mongoose.Types.ObjectId(flag)
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

exports.removeLostPetFlag = async (req, res) => {
  const { id, flag } = req.body;
  try {
    const updatedListing = await lostPetListing.removeFlag(
      id,
      mongoose.Types.ObjectId(flag)
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

exports.addFindingReport = async (req, res) => {
  const { id, reportId } = req.body;
  try {
    const updatedListing = await lostPetListing.addFindingReport(
      id,
      mongoose.Types.ObjectId(reportId)
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

exports.removeFindingReport = async (req, res) => {
  const { id, reportId } = req.body;
  try {
    const updatedListing = await lostPetListing.removeFindingReport(
      id,
      mongoose.Types.ObjectId(reportId)
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

exports.removeLostPetListing = async (req, res) => {
  const { id, removal } = req.body;
  try {
    const updatedListing = await lostPetListing.removeListing(
      id,
      mongoose.Types.ObjectId(removal)
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

exports.deleteLostPetListing = async (req, res) => {
  const { id } = req.params;
  try {
    await lostPetListing.findByIdAndDelete(id);
    res.status(200).json({ message: "Listing deleted successfully" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
