const User = require("../models/User");

const registerUser = async (req,res) => {
try{

const {
username,
email,
dob,
mobile,
password,
secretQuestion,
secretAnswer
} = req.body;

const existingUser = await User.findOne({ email });

if(existingUser){
return res.status(400).json({ message:"User already exists" });
}

const newUser = new User({
username,
email,
dob,
mobile,
password,
secretQuestion,
secretAnswer
});

await newUser.save();

res.status(201).json({
message:"Registration successful",
user:newUser
});

}catch(error){
console.log(error);
res.status(500).json({ message:"Server Error" });
}
};

const loginUser = async (req,res) => {
try{

const { email, password } = req.body;

const user = await User.findOne({ email, password });

if(!user){
return res.status(400).json({ message:"Invalid email or password" });
}

res.json({
message:"Login successful",
user:user
});

}catch(error){
console.log(error);
res.status(500).json({ message:"Server Error" });
}
};

const forgotPassword = async (req,res) => {
try{

const { email, secretQuestion, secretAnswer, newPassword } = req.body;

const user = await User.findOne({ email });

if(!user){
return res.status(404).json({ message:"User not found" });
}

if(user.secretQuestion !== secretQuestion){
return res.status(400).json({ message:"Secret question does not match" });
}

if(user.secretAnswer !== secretAnswer){
return res.status(400).json({ message:"Secret answer is incorrect" });
}

user.password = newPassword;
await user.save();

res.json({ message:"Password updated successfully" });

}catch(error){
console.log(error);
res.status(500).json({ message:"Server Error" });
}
};

const changePassword = async (req,res) => {
try{

const { email, oldPassword, newPassword } = req.body;

const user = await User.findOne({ email, password: oldPassword });

if(!user){
return res.status(400).json({ message:"Old password is incorrect" });
}

user.password = newPassword;
await user.save();

res.json({ message:"Password changed successfully" });

}catch(error){
console.log(error);
res.status(500).json({ message:"Server Error" });
}
};

module.exports = {
registerUser,
loginUser,
forgotPassword,
changePassword
};