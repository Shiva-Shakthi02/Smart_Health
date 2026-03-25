const express = require("express");
const router = express.Router();

const { addCalories, getCaloriesData } = require("../controllers/calorieController");

router.post("/add", addCalories);
router.get("/:userId", getCaloriesData);

module.exports = router;