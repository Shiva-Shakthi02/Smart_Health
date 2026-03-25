const express = require("express");
const router = express.Router();

const { generateReport, getReports } = require("../controllers/reportController");

router.post("/generate", generateReport);

router.get("/:id", getReports);

module.exports = router;