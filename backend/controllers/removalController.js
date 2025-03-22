const removal = require("../models/removalModel");

exports.removeListing = async (req, res) => {
  const { listingId, userId, removalReason } = req.body;
  try {
    const newRemoval = await removal.removeListing(
      listingId,
      userId,
      removalReason
    );
    return res.status(201).json(newRemoval);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.undoRemoval = async (req, res) => {
  const { removalId } = req.body;
  try {
    const removed = await removal.undoRemoval(removalId);
    return res.status(200).json(removed);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
