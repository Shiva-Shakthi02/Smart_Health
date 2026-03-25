const BodyTemperature = require("../models/BodyTemperature");

const addTemperature = async(req,res)=>{

try{

const data = new BodyTemperature(req.body);

await data.save();

res.json({message:"Temperature Saved"});

}catch(error){

res.status(500).json({message:"Server Error"});

}

};

const getTemperatures = async(req,res)=>{

try{

const data = await BodyTemperature.find({userId:req.params.userId});

res.json(data);

}catch(error){

res.status(500).json({message:"Server Error"});

}

};

module.exports = { addTemperature, getTemperatures };