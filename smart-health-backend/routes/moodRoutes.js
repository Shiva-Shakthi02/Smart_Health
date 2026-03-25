const express = require("express");
const router = express.Router();

const { addMood, getMoodData } = require("../controllers/moodController");

router.post("/add", addMood);
router.get("/:userId", getMoodData);

module.exports = router;