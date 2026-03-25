const mongoose = require("mongoose");

const StepsSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  steps: {
    type: Number,
    required: true
  },
  date: {
    type: String
  }
});

module.exports = mongoose.models.Steps || mongoose.model("Steps", StepsSchema);//error; should be added