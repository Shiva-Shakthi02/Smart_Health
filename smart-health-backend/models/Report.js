const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,//error , should be added
    ref: "User"
  },

  reportDate: {
    type: Date,
    default: Date.now
  },

  heartRateAvg: Number,
  temperatureAvg: Number,
  sugarAvg: Number,
  sleepAvg: Number,

  riskLevel: String,

  recommendations: String

});

module.exports = mongoose.model("Report", reportSchema);