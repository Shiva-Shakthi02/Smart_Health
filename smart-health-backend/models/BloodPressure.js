const mongoose = require("mongoose");

const BloodPressureSchema = new mongoose.Schema({
userId:{
type:String,
required:true
},
systolic:{
type:Number,
required:true
},
diastolic:{
type:Number,
required:true
},
date:{
type:String,
required:true
}
});

module.exports = mongoose.models.BloodPressure || mongoose.model("BloodPressure", BloodPressureSchema);