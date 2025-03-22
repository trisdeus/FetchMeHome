const FindingReport = require("../models/findingReportModel");

exports.getFindingReportById = async (req, res) => {
  const { id } = req.params;
  try {
    const findingReport = await FindingReport.findById(id);
    res.status(200).json(findingReport);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.getFindingReportByUser = async (req, res) => {
  const userId = req.user._id;
  try {
    const findingReports = await FindingReport.find({ user: userId });
    res.status(200).json(findingReports);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.createReport = async (req, res) => {
  const { reportDate, reportLocation, reportStatus } = req.body;
  const userId = req.user._id;

  try {
    const report = await FindingReport.createReport({
      user: userId,
      reportDate,
      reportLocation,
      reportStatus,
    });

    res.status(201).json({
      status: "success",
      data: {
        report,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.updateReportStatus = async (req, res) => {
  const { reportId, newStatus } = req.body;

  try {
    const updatedReport = await FindingReport.updateReportStatus(
      reportId,
      newStatus
    );

    res.status(200).json({
      status: "success",
      data: {
        report: updatedReport,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.editReport = async (req, res) => {
  const { reportId, newReportDate, newReportLocation } = req.body;

  try {
    const updatedReport = await FindingReport.editReport(
      reportId,
      newReportDate,
      newReportLocation
    );

    res.status(200).json({
      status: "success",
      data: {
        report: updatedReport,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.deleteReport = async (req, res) => {
  const { reportId } = req.body;

  try {
    const deletedReport = await FindingReport.deleteReport(reportId);

    res.status(200).json({
      status: "success",
      data: {
        report: deletedReport,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
