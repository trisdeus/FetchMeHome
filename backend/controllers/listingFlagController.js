const listingFlag = require("../models/listingFlagModel");

exports.flagListing = async (req, res) => {
  const { listingId, userId, flagReason } = req.body;
  try {
    const newFlag = await listingFlag.flagListing(
      listingId,
      userId,
      flagReason
    );
    return res.status(201).json(newFlag);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.removeFlag = async (req, res) => {
  const { flagId } = req.body;
  try {
    const removed = await listingFlag.removeFlag(flagId);
    return res.status(200).json(removed);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
