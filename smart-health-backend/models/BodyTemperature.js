const mongoose = require("mongoose");//error ; should be added

const BodyTemperatureSchema = new mongoose.Schema({

userId:{
type:String,
required:true
},

temperature:{
type:Number,
required:true
},

date:{
type:String
}

});

module.exports = mongoose.model("BodyTemperature", BodyTemperatureSchema);