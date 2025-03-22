const userFlag = require("../models/userFlagModel");

exports.flagUser = async (req, res) => {
  const { flaggedUserId, userId, flagReason } = req.body;
  try {
    const newFlag = await userFlag.flagUser(flaggedUserId, userId, flagReason);
    return res.status(201).json(newFlag);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.removeFlag = async (req, res) => {
  const { flagId } = req.body;
  try {
    const removed = await userFlag.removeFlag(flagId);
    return res.status(200).json(removed);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
