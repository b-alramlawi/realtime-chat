// controllers/groupMessageController.js

const GroupMessage = require('../models/GroupMessage');

async function saveGroupMessage(groupID, senderID, message) {
    try {
        return await GroupMessage.saveGroupMessage(groupID, senderID, message);
    } catch (error) {
        console.error('Error saving group message:', error);
        throw error;
    }
}

async function getAllGroupMessages(req, res) {
    const {groupID} = req.query;

    try {
        const messages = await GroupMessage.getAllGroupMessages(groupID);
        const responseData = {messages: messages};

        apiResponse(res, 200, 'success', 'Group Messages retrieved successfully', responseData);
    } catch (error) {
        console.error('Error fetching group messages:', error);
        apiResponse(res, 500, 'error', 'Internal Server Error', null);
    }
}

module.exports = {
    saveGroupMessage,
    getAllGroupMessages,
};
