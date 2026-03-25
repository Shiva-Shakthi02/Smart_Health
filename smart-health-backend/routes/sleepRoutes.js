const express = require("express");
const router = express.Router();

const { addSleep, getSleepData } = require("../controllers/sleepController");

router.post("/add", addSleep);
router.get("/:userId", getSleepData);

module.exports = router;