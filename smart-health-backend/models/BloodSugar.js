const mongoose = require("mongoose");

const BloodSugarSchema = new mongoose.Schema({
userId:{
type:String,
required:true
},
bloodSugar:{
type:Number,
required:true
},
date:{
type:String,
required:true
}
});

module.exports = mongoose.models.BloodSugar || mongoose.model("BloodSugar", BloodSugarSchema);