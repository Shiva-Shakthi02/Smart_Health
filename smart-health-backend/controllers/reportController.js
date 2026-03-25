const Report = require("../models/Report");

exports.generateReport = async (req, res) => {

  try {

    const report = new Report(req.body);

    await report.save();

    res.json({
      message: "Report generated successfully",
      report
    });

  } catch (error) {

    res.status(500).json(error);

  }

};


exports.getReports = async (req, res) => {

  try {

    const reports = await Report.find({ userId: req.params.id });

    res.json(reports);

  } catch (error) {

    res.status(500).json(error);

  }

};