const mongoose = require("mongoose");

const WaterSchema = new mongoose.Schema({
userId:{
type:String,
required:true
},
amount:{
type:Number,
required:true
},
date:{
type:String
}
});

module.exports = mongoose.models.Water || mongoose.model("Water", WaterSchema);