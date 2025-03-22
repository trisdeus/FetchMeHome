const AdoptionRequest = require("../models/adoptionRequestModel");

exports.getAdoptionRequest = async (req, res) => {
  const { id } = req.params;
  try {
    const adoptionRequest = await AdoptionRequest.findById(id);
    res.status(200).json(adoptionRequest);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.createAdoptionRequest = async (req, res) => {
  const { adoptPetListing, user, message } = req.body;
  try {
    const adoptionRequest = await AdoptionRequest.createAdoptionRequest(
      adoptPetListing,
      user,
      message
    );
    res.status(201).json(adoptionRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateAdoptionRequest = async (req, res) => {
  const { id } = req.params;
  const { requestStatus } = req.body;
  try {
    const adoptionRequest = await AdoptionRequest.updateAdoptionRequest(
      id,
      requestStatus
    );
    res.status(200).json(adoptionRequest);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.editAdoptionRequest = async (req, res) => {
  const { id } = req.params;
  const { adoptPetListing, user, message } = req.body;
  try {
    const adoptionRequest = await AdoptionRequest.editAdoptionRequest(
      id,
      message
    );
    res.status(200).json(adoptionRequest);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.deleteAdoptionRequest = async (req, res) => {
  const { id } = req.params;
  try {
    const adoptionRequest = await AdoptionRequest.deleteAdoptionRequest(id);
    res.status(200).json({ message: "Adoption Request deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
