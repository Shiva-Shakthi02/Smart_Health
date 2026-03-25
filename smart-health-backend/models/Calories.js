const mongoose = require("mongoose");

const CaloriesSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  caloriesBurned: {
    type: Number,
    required: true
  },
  date: {
    type: String
  }
});

module.exports = mongoose.models.Calories || mongoose.model("Calories", CaloriesSchema);