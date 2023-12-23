// routes/api.js

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const authController = require('../controllers/authController');
const profileController = require('../controllers/profileController');
const contactController = require('../controllers/contactController');
const conversationController = require('../controllers/conversationController');
const messageController = require('../controllers/messageController');
const groupController = require('../controllers/groupController');
const groupMessageController = require('../controllers/groupMessageController');

// Authentication management routes
router.post('/login', authController.loginUser);
router.post('/verify', authController.verifyUser);
router.post('/logout', authMiddleware.isAuthenticated, authController.logoutUser);

// User profile management routes
router.get('/profile/:userId', authMiddleware.isAuthenticated, profileController.getUserById);
router.put('/update-profile/:userId', authMiddleware.isAuthenticated, profileController.updateProfile);

// Contacts management routes
router.get('/get-all-contacts/:userId', authMiddleware.isAuthenticated, contactController.getAllContacts);
router.get('/search-contacts/:userId', authMiddleware.isAuthenticated, contactController.searchContacts);
router.get('/get-contact/:contactId', authMiddleware.isAuthenticated, contactController.getContactById);

// Conversations management routes
router.get('/conversations/:userId', authMiddleware.isAuthenticated, conversationController.getAllConversationsByUserId);

// Single Messages management routes
router.get('/messages', authMiddleware.isAuthenticated, messageController.getAllMessages);

// Group management routes
router.post('/groups/create', authMiddleware.isAuthenticated, groupController.createGroupWithImage);
router.get('/user/:userId/groups', authMiddleware.isAuthenticated, groupController.getAllGroupsByUserId);
router.get('/group/messages', authMiddleware.isAuthenticated, groupMessageController.getAllGroupMessages);


module.exports = router;
