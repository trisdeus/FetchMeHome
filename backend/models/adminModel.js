const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      sparse: true,
    },
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

adminSchema.statics.assignAdmin = async function (user, assignedBy) {
  if (!user || !assignedBy) {
    throw new Error("User is required.");
  }

  if (user.ban || assignedBy.ban) {
    throw new Error("User is banned.");
  }

  if (user.flag.length > 0) {
    throw new Error("User is flagged.");
  }

  const assignerIsAdmin = await this.findOne({ user: assignedBy });
  if (!assignerIsAdmin) {
    throw new Error("You are not an admin.");
  }

  const assigneeIsAdmin = await this.findOne({ user });
  if (assigneeIsAdmin) {
    throw new Error("User is already an admin.");
  }

  if (!user.isEmailVerified || !user.isPhoneVerified) {
    throw new Error("User is not verified.");
  }

  if (!assignedBy.isEmailVerified || !assignedBy.isPhoneVerified) {
    throw new Error("You are not verified.");
  }

  try {
    const admin = new this({ user, assignedBy });
    await admin.save();
    return admin;
  } catch (error) {
    throw new Error(error);
  }
};

adminSchema.statics.removeAdmin = async function (user, removedBy) {
  if (!user || !removedBy) {
    throw new Error("User is required.");
  }

  const removerIsAdmin = await this.findOne({ user: removedBy });
  if (!removerIsAdmin) {
    throw new Error("You are not an admin.");
  }

  const admin = await this.findOne({ user });
  if (!admin) {
    throw new Error("User is not an admin.");
  }

  try {
    await admin.remove();
    return admin;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = mongoose.model("Admin", adminSchema);
