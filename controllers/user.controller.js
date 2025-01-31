const User = require('../models/user.model');

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, mobileNumber, bio, availability } = req.body;
    const updateData = {};

    if (name) updateData.name = name;
    if (mobileNumber) updateData.mobileNumber = mobileNumber;
    if (bio) updateData.bio = bio;
    if (availability) updateData.availability = availability;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updateData },
      { new: true }
    ).select('-password');

    res.json({
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile' });
  }
};

module.exports={getProfile,updateProfile};