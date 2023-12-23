// controllers/messageController.js

const Message = require('../models/Message');

async function saveMessage(senderID, receiverID, message) {
    try {
        return await Message.saveMessage(senderID, receiverID, message);
    } catch (error) {
        console.error('Error saving message:', error);
        throw new Error('Internal Server Error');
    }
}

async function getAllMessages(req, res) {
    const {senderID, receiverID} = req.query;

    try {
        const messages = await Message.getAllMessages(senderID, receiverID);

        const responseData = {
            messages: messages,
        };

        const statusCode = 200;
        const status = 'success';
        const message = 'Messages retrieved successfully';

        apiResponse(res, statusCode, status, message, responseData);
    } catch (error) {
        console.error('Error fetching messages:', error);

        const statusCode = 500;
        const status = 'error';
        const message = 'Internal Server Error';

        apiResponse(res, statusCode, status, message, null);
    }
}

module.exports = {
    saveMessage,
    getAllMessages,
};
