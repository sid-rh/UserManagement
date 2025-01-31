const express = require('express');
const {sendNotification,getAllUsers} = require('../controllers/admin.controller');
const { authenticate, isAdmin } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/notifications',
            authenticate,
            isAdmin,
            sendNotification);

router.get('/users', authenticate, isAdmin, getAllUsers);

module.exports = router;