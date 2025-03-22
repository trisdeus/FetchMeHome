const mongoose = require("mongoose");
const validator = require("validator");

const findingReportSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reportDate: {
      type: Date,
      required: true,
    },
    reportLocation: {
      type: String,
      required: true,
    },
    reportStatus: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const validateReport = (reportDate, reportLocation) => {
  if (!reportDate) {
    throw new Error("Report date is required.");
  } else if (!validator.isDate(reportDate)) {
    throw new Error("Report date must be a valid date.");
  } else if (new Date(reportDate) > new Date()) {
    throw new Error("Report date cannot be in the future.");
  }

  if (!reportLocation) {
    throw new Error("Report location is required.");
  } else if (reportLocation.length < 3) {
    throw new Error("Report location must be at least 3 characters long.");
  } else if (!/^[A-Za-z0-9\s.,!?'"-/]+$/.test(reportLocation)) {
    throw new Error(
      "Report location must contain only letters, numbers, spaces, and punctuation."
    );
  }
};

findingReportSchema.statics.createReport = async function (
  user,
  reportDate,
  reportLocation
) {
  if (!user) {
    throw new Error("User is required.");
  }

  try {
    validateReport(reportDate, reportLocation);
  } catch (error) {
    throw new Error(error);
  }

  const report = new this({
    user,
    reportDate,
    reportLocation,
    reportStatus: "Pending",
  });

  await report.save();
  return report;
};

findingReportSchema.statics.updateReportStatus = async function (
  reportId,
  newStatus
) {
  const report = await this.findById(reportId);
  if (!report) {
    throw new Error("Report not found.");
  }

  if (!newStatus) {
    throw new Error("New status is required.");
  } else if (!["Pending", "In Progress", "Resolved"].includes(newStatus)) {
    throw new Error("Invalid status value.");
  }

  report.reportStatus = newStatus;
  await report.save();
  return report;
};

findingReportSchema.statics.editReport = async function (
  reportId,
  newReportDate,
  newReportLocation
) {
  const report = await this.findById(reportId);
  if (!report) {
    throw new Error("Report not found.");
  }

  try {
    validateReport(newReportDate, newReportLocation);
  } catch (error) {
    throw new Error(error);
  }

  report.reportDate = newReportDate;
  report.reportLocation = newReportLocation;
  report.reportStatus = "Pending";

  await report.save();
  return report;
};

findingReportSchema.statics.deleteReport = async function (reportId) {
  const report = await this.findById(reportId);
  if (!report) {
    throw new Error("Report not found.");
  }

  await report.remove();
  return report;
};

module.exports = mongoose.model("FindingReport", findingReportSchema);
