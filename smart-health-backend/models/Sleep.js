const mongoose = require("mongoose");

const SleepSchema = new mongoose.Schema({
userId:{
type:String,
required:true
},
sleepHours:{
type:Number,
required:true
},
date:{
type:String
}
});

module.exports = mongoose.models.Sleep || mongoose.model("Sleep", SleepSchema);//error; should be added