const Notification = require('../models/notification.model');
const User = require('../models/user.model');

const sendNotification = async (req, res) => {
  try {
    const { recipients, message } = req.body;

    const notification = new Notification({
      sender: req.user._id,
      recipients,
      message
    });

    await notification.save();

    // Check recipients' availability and update status accordingly
    for (const recipientId of recipients) {
      const recipient = await User.findById(recipientId);
      if (isUserAvailable(recipient)) {
        notification.status = 'delivered';
        notification.deliveredAt = new Date();
        await notification.save();
      }
    }

    res.status(201).json({
      message: 'Notification sent successfully',
      notification
    });
  } catch (error) {
    res.status(500).json({ message: 'Error sending notification' });
  }
};

const getReceivedNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      recipients: req.user._id
    })
      .populate('sender', 'name email')
      .sort('-sentAt');

    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notifications' });
  }
};

const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findOne({
      _id: req.params.id,
      recipients: req.user._id
    });

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    notification.status = 'read';
    await notification.save();

    res.json({
      message: 'Notification marked as read',
      notification
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating notification' });
  }
};

const isUserAvailable=(user)=> {
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
}

module.exports={sendNotification,getReceivedNotifications,markAsRead};