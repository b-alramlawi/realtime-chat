// controllers/conversationController.js

const Conversation = require('../models/Conversation');

async function getOrCreateConversation(participant1, participant2) {
    try {
        return await Conversation.getOrCreateConversation(participant1, participant2);
    } catch (error) {
        console.error('Error getting or creating conversation:', error);
        throw new Error('Internal Server Error');
    }
}

const getAllConversationsByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;
        const conversations = await Conversation.getAllConversationsByUserId(userId);

        apiResponse(res, 200, 'success', 'Conversations retrieved successfully', conversations);
    } catch (err) {
        console.error('Error retrieving conversations:', err);
        apiResponse(res, 500, 'error', 'Internal Server Error', err.message);
    }
}

module.exports = {
    getOrCreateConversation,
    getAllConversationsByUserId
};
