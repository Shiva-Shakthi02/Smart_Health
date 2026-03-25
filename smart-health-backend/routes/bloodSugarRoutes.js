const express = require("express");
const router = express.Router();

const { addBloodSugar, getBloodSugarData } = require("../controllers/bloodSugarController");

router.post("/add", addBloodSugar);
router.get("/:userId", getBloodSugarData);

module.exports = router;