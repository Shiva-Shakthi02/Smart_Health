const express = require("express");
const router = express.Router();

const { addWater, getWaterData } = require("../controllers/waterController");

router.post("/add", addWater);
router.get("/:userId", getWaterData);

module.exports = router;