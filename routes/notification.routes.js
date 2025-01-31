const express = require('express');
const {sendNotification,getReceivedNotifications,markAsRead} = require('../controllers/notification.controller');
const { authenticate } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/send', authenticate, sendNotification);

router.get('/received', authenticate, getReceivedNotifications);

router.put('/:id/read', authenticate, markAsRead);

module.exports = router;