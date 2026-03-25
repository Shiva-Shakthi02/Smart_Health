const BloodSugar = require("../models/BloodSugar");

const addBloodSugar = async (req,res) => {
try{
const data = new BloodSugar(req.body);
await data.save();
res.json({ message:"Blood Sugar Saved Successfully" });
}catch(error){
console.log(error);
res.status(500).json({ message:"Server Error" });
}
};

const getBloodSugarData = async (req,res) => {
try{
const data = await BloodSugar.find({ userId:req.params.userId });
res.json(data);
}catch(error){
console.log(error);
res.status(500).json({ message:"Server Error" });
}
};

module.exports = { addBloodSugar, getBloodSugarData };