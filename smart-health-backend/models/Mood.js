const mongoose = require("mongoose");

const MoodSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  mood: {
    type: String,
    required: true
  },
  date: {
    type: String
  }
});

module.exports = mongoose.models.Mood || mongoose.model("Mood", MoodSchema);