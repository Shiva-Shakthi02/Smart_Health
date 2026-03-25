const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
userId:{ type:String, required:true },
username:String,
email:String,
mobile:String,
dob:String,
gender:String,
height:String,
weight:String,
bloodGroup:String,
emergencyContact:String,
medicalCondition:String,
profilePic:String
});

module.exports = mongoose.models.Profile || mongoose.model("Profile", ProfileSchema);