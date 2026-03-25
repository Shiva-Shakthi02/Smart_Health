const User = require("../models/User");

exports.updateProfile = async (req, res) => {

  try {

    const userId = req.params.id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      req.body,
      { new: true }
    );

    res.json({
      message: "Profile updated successfully",
      user: updatedUser
    });

  } catch (error) {

    res.status(500).json(error);

  }

};


exports.getProfile = async (req, res) => {

  try {

    const user = await User.findById(req.params.id);

    res.json(user);

  } catch (error) {

    res.status(500).json(error);

  }

};