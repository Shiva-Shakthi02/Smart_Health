const Water = require("../models/Water");

const addWater = async (req,res) => {
try{
const data = new Water(req.body);
await data.save();
res.json({ message:"Water Intake Saved" });
}catch(error){
console.log(error);
res.status(500).json({ message:"Server Error" });
}
};

const getWaterData = async (req,res) => {
try{
const data = await Water.find({ userId:req.params.userId });
res.json(data);
}catch(error){
console.log(error);
res.status(500).json({ message:"Server Error" });
}
};

module.exports = { addWater, getWaterData };