const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipients: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  message: {
    type: String,
    required: true,
    trim: true
  },
  isCritical: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['pending', 'delivered', 'read'],
    default: 'pending'
  },
  sentAt: {
    type: Date,
    default: Date.now
  },
  deliveredAt: {
    type: Date
  }
});

module.exports = mongoose.model('Notification', notificationSchema);