const express = require("express");

const router = express.Router();

const { addTemperature, getTemperatures } = require("../controllers/temperatureController");

router.post("/add", addTemperature);

router.get("/:userId", getTemperatures);

module.exports = router;