const Mood = require("../models/Mood");

const addMood = async (req, res) => {
  try {
    const data = new Mood(req.body);
    await data.save();
    res.json({ message: "Mood Saved" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getMoodData = async (req, res) => {
  try {
    const data = await Mood.find({ userId: req.params.userId });
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { addMood, getMoodData };