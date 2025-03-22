const user = require("../models/userModel");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ _id: id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

exports.getUser = async (req, res) => {
  const { id } = req.params; // Here, 'id' represents the user's email or phone number
  try {
    const foundUser = await user.findOne({
      $or: [{ email: id }, { phone: id }],
    });
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(foundUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params; // 'id' is actually the email or phone number
  const updatedData = req.body;
  try {
    const updatedUser = await user.findOneAndUpdate(
      { $or: [{ email: id }, { phone: id }] },
      updatedData,
      { new: true }
    );
    if (!updatedUser)
      return res.status(404).send("No user with that identifier");
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params; // 'id' is either the user's email or phone
  try {
    const deletedUser = await user.findOneAndRemove({
      $or: [{ email: id }, { phone: id }],
    });
    if (!deletedUser)
      return res.status(404).send("No user with that identifier");
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.signupUser = async (req, res) => {
  const { name, phone, email, password } = req.body;

  try {
    const newUser = await user.signup(name, phone, email, password);
    const token = generateToken(newUser._id);
    res.status(201).json(newUser, token);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// login endpoint that expects a POST request with JSON { identifier, password }.
exports.loginUser = async (req, res) => {
  const { identifier, password } = req.body;

  try {
    const foundUser = await user.login(identifier, password);
    const token = generateToken(foundUser._id);
    res.status(200).json(foundUser, token);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.me = async (req, res) => {
  const { userId } = req;
  try {
    const foundUser = await user.findById(userId).select("-password");
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(foundUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
