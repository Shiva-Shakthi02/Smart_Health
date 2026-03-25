const HeartRate = require("../models/HeartRate");

const addHeartRate = async (req,res)=>{

try{

const data = new HeartRate(req.body);

await data.save();

res.json({message:"Heart Rate Saved"});

}catch(error){

res.status(500).json({message:"Server Error"});

}

};

const getHeartRates = async (req,res)=>{

try{

const data = await HeartRate.find({userId:req.params.userId});

res.json(data);

}catch(error){

res.status(500).json({message:"Server Error"});

}

};

module.exports = { addHeartRate, getHeartRates };//error; should be added