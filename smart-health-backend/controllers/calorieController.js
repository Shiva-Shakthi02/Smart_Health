const Calories = require("../models/Calories");

const addCalories = async (req, res) => {
  try {
    const data = new Calories(req.body);
    await data.save();
    res.json({ message: "Calories Saved" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getCaloriesData = async (req, res) => {
  try {
    const data = await Calories.find({ userId: req.params.userId });
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { addCalories, getCaloriesData };