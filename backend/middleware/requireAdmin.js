const User = require("../models/userModel");
const Admin = require("../models/adminModel");

exports.requireAdmin = async (req, res, next) => {
  // requireAuth should have already verified the token and attached req.userId
  if (!req.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // Fetch the user document using the ID from requireAuth
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Check if the user has an admin record
    const admin = await Admin.findOne({ user: user });
    if (!admin) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Attach the admin document to the request object
    req.adminId = await Admin.findById(admin._id).select("_id");
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
