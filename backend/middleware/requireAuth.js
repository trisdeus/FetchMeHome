const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.requireAuth = async (req, res, next) => {
  // Check if the Authorization header is present
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  try {
    // Verify the token
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user ID to the request object
    req.userId = await User.findById(_id).select("_id");

    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
