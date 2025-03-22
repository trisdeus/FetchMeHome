const ban = require("../models/banModel");

exports.banUser = async (req, res) => {
  const { bannedUserId, userId, banReason } = req.body;
  try {
    const newBan = await ban.banUser(bannedUserId, userId, banReason);
    return res.status(201).json(newBan);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.unbanUser = async (req, res) => {
  const { banId } = req.body;
  try {
    const removed = await ban.unbanUser(banId);
    return res.status(200).json(removed);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
