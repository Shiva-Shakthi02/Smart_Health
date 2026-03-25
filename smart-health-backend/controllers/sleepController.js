const Sleep = require("../models/Sleep");

const addSleep = async (req, res) => {
  try {
    const data = new Sleep(req.body);
    await data.save();
    res.json({ message: "Sleep Data Saved" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const getSleepData = async (req, res) => {
  try {
    const data = await Sleep.find({ userId: req.params.userId });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { addSleep, getSleepData };