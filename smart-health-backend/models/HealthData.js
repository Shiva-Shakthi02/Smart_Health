const mongoose = require("mongoose");

const HealthSchema = new mongoose.Schema({

userId:{
type:String,
required:true
},

date:{
type:String
},

heartRate:{
type:Number
},

bodyTemperature:{
type:Number
},

sleepHours:{
type:Number
},

steps:{
type:Number
},

waterIntake:{
type:Number
},

caloriesBurned:{
type:Number
},

mood:{
type:String
}

});

module.exports = mongoose.model("HealthData", HealthSchema);