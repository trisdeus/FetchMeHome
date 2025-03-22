const mongoose = require("mongoose");
const admin = require("../models/adminModel");

exports.assignAdmin = async (req, res) => {
  const { user, assignedBy } = req.body;
  try {
    const admin = await admin.assignAdmin(user, assignedBy);
    res.status(201).json(admin);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.removeAdmin = async (req, res) => {
  const { user, removedBy } = req.body;
  try {
    const admin = await admin.removeAdmin(user, removedBy);
    res.status(200).json(admin);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
