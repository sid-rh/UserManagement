const Notification = require('../models/notification.model');
const User = require('../models/user.model');

const sendNotification = async (req, res) => {
  try {
    const { recipients, message, isCritical } = req.body;

    const notification = new Notification({
      sender: req.user._id,
      recipients,
      message,
      isCritical
    });

    if (isCritical) {
      notification.status = 'delivered';
      notification.deliveredAt = new Date();
    } else {
      // Check recipients' availability for non-critical notifications
      for (const recipientId of recipients) {
        const recipient = await User.findById(recipientId);
        if (isUserAvailable(recipient)) {
          notification.status = 'delivered';
          notification.deliveredAt = new Date();
        }
      }
    }

    await notification.save();

    res.status(201).json({
      message: 'Admin notification sent successfully',
      notification
    });
  } catch (error) {
    res.status(500).json({ message: 'Error sending notification' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select('-password')
      .sort('name');

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
};

const isUserAvailable= (user)=>{
  if (!user.availability || user.availability.length === 0) {
    return true;
  }

  const now = new Date();
  const currentDay = now.getDay();
  const currentTime = now.toLocaleTimeString('en-US', { hour12: false });

  return user.availability.some(slot => {

    return slot.dayOfWeek === currentDay &&
           currentTime >= slot.startTime &&
           currentTime <= slot.endTime;
  });
};

module.exports={sendNotification,getAllUsers};