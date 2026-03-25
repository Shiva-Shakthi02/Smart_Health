const express = require("express");
const router = express.Router();

const { createProfile, getProfile, updateProfile } = require("../controllers/profilesController");

router.post("/create", createProfile);
router.get("/:userId", getProfile);
router.put("/:userId", updateProfile);

module.exports = router;