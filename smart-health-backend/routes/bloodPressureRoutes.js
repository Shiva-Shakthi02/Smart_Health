const express = require("express");
const router = express.Router();

const { addBloodPressure, getBloodPressureData } = require("../controllers/bloodPressureController");

router.post("/add", addBloodPressure);
router.get("/:userId", getBloodPressureData);

module.exports = router;