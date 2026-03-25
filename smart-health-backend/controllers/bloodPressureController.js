const BloodPressure = require("../models/BloodPressure");

const addBloodPressure = async (req,res) => {
try{
const data = new BloodPressure(req.body);
await data.save();
res.json({ message:"Blood Pressure Saved Successfully" });
}catch(error){
console.log(error);
res.status(500).json({ message:"Server Error" });
}
};

const getBloodPressureData = async (req,res) => {
try{
const data = await BloodPressure.find({ userId:req.params.userId });
res.json(data);
}catch(error){
console.log(error);
res.status(500).json({ message:"Server Error" });
}
};

module.exports = { addBloodPressure, getBloodPressureData };