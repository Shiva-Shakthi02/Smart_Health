const mongoose = require("mongoose");//error;should be added

const HeartRateSchema = new mongoose.Schema({

userId:{
type:String,
required:true
},

heartRate:{
type:Number,
required:true
},

date:{
type:String
}

});

module.exports = mongoose.model("HeartRate", HeartRateSchema);