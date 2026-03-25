const HealthData = require("../models/HealthData");

// Add health data
const addHealthData = async (req, res) => {

try {

const health = new HealthData(req.body);

await health.save();

res.status(200).json({
message: "Health data saved successfully",
data: health
});

} catch (error) {

console.log(error);

res.status(500).json({
message: "Server error"
});

}

};

module.exports = { addHealthData };