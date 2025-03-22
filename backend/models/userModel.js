const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validatoridator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      sparse: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      sparse: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      required: true,
      default: "/uploads/profilePics/default.jpg", // Default profile picture path
    },
    bio: {
      type: String,
      required: true,
      default: "Hello! I am a new user.",
    },
    isFirstTime: {
      type: Boolean,
      required: true,
      default: true,
    },
    isEmailVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    isPhoneVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    flag: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserFlag",
        required: false,
      },
    ],
    ban: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ban",
      required: false,
    },
  },
  { timestamps: true }
);

userSchema.statics.signup = async function (name, phone, email, password) {
  if (!name || !email || !phone || !password) {
    throw new Error("All fields are required");
  }

  if (!validator.isAlpha(name.replace(/\s/g, "")) || name.length < 3) {
    throw new Error(
      "Name must be at least 3 characters long and contain only letters and spaces"
    );
  }

  if (!validator.isEmail(email)) {
    throw new Error("Invalid email address");
  }

  if (!validator.isMobilePhone(phone)) {
    throw new Error("Invalid phone number");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error(
      "Password must be at least 8 characters long and contain a number"
    );
  }

  const exists = await this.findOne({ $or: [{ phone }, { email }] });
  if (exists) {
    throw new Error("Email or phone number is already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  name = validator.escape(name);
  phone = validator.escape(phone);
  email = validator.escape(email);

  try {
    const user = new this({ name, phone, email, password: hash });
    await user.save();
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

userSchema.statics.login = async function (id, password) {
  if (!id || !password) {
    throw new Error("All fields are required");
  }

  const user = await this.findOne({ $or: [{ email: id }, { phone: id }] });
  if (!user) {
    throw new Error("User not found");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error("Invalid credentials");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
