const express = require("express");

const router = express.Router();

const { addHeartRate , getHeartRates } = require("../controllers/heartRateController");

router.post("/add",addHeartRate);

router.get("/:userId",getHeartRates);

module.exports = router;