const Profile = require("../models/Profile");

const createProfile = async (req,res) => {
try{
console.log("Incoming profile data:", req.body);
const existingProfile = await Profile.findOne({ userId:req.body.userId });

if(existingProfile){
return res.json(existingProfile);
}

const profile = new Profile(req.body);
await profile.save();

res.json({ message:"Profile Created Successfully", profile });

}catch(error){
console.log("Create profile error:",error);
res.status(500).json({ message:"Server Error" });
}
};

const getProfile = async (req,res) => {
try{
console.log("Fetching profile for userId:",req.params.userId);
const profile = await Profile.findOne({ userId:req.params.userId });
console.log("Fetched profile from DB:",profile);
if(!profile){
return res.status(404).json({ message:"Profile not found" });
}

res.json(profile);

}catch(error){
console.log("Get profile error:",error);
res.status(500).json({ message:"Server Error" });
}
};

const updateProfile = async (req,res) => {
try{
console.log("Updating profile for userId:",req.params.userId);
console.log("Update body:",req.body);
const updatedProfile = await Profile.findOneAndUpdate(
{ userId:req.params.userId },
req.body,
{ returnDocument:"after", upsert:true }
);
console.log("Updated profile:",updatedProfile);
res.json({ message:"Profile Updated Successfully", profile:updatedProfile });

}catch(error){
console.log(error);
res.status(500).json({ message:"Server Error" });
}
};

module.exports = { createProfile, getProfile, updateProfile };