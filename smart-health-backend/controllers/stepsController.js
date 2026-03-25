const Steps = require("../models/Steps");

const addSteps = async (req,res) => {
try{
const data = new Steps(req.body);
await data.save();
res.json({ message:"Steps Saved" });
}catch(error){
console.log(error);
res.status(500).json({ message:"Server Error" });
}
};

const getStepsData = async (req,res) => {
try{
const data = await Steps.find({ userId:req.params.userId });
res.json(data);
}catch(error){
console.log(error);
res.status(500).json({ message:"Server Error" });
}
};

module.exports = { addSteps, getStepsData };