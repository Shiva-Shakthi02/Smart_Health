const express = require("express");
const router = express.Router();

const { addSteps, getStepsData } = require("../controllers/stepsController");

router.post("/add", addSteps);
router.get("/:userId", getStepsData);

module.exports = router;