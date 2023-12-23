// socket.js

const socketIO = require('socket.io');
const messageController = require('../controllers/messageController');
const conversationController = require('../controllers/conversationController');
const groupMessageController = require('../controllers/groupMessageController');

function setupSocketServer(server) {
    const io = socketIO(server);

    // Namespace for chat
    const chatNamespace = io.of('/chat');
    chatNamespace.on('connection', (socket) => {
        console.log('A user connected to chat');

        // Handle chat messages
        socket.on('chat message', async (msg) => {
            try {
                const conversation = await conversationController.getOrCreateConversation(msg.senderID, msg.receiverID);
                const {
                    newMessage,
                    timestamp
                } = await messageController.saveMessage(msg.senderID, msg.receiverID, msg.message);

                // Add the message reference to the conversation
                conversation.messages.push(newMessage._id);
                await conversation.save();

                // Broadcast the message to everyone in the chat namespace
                chatNamespace.emit('chat message', {...msg, time: timestamp});

                // Format the timestamp to a human-readable string
                const formattedTime = new Date(timestamp).toLocaleString();
                console.log(`Message from ${msg.senderID} to ${msg.receiverID}: " ${msg.message} " at ${formattedTime}`);

            } catch (error) {
                // Handle errors and emit an error message to the client
                console.error('Error handling chat message:', error);
                socket.emit('error message', 'An error occurred while processing your message');
            }
        });

        // Handle disconnection
        socket.on('disconnect', () => {
            console.log('User disconnected from chat');
        });
    });

    // Namespace for group chat
    const groupNamespace = io.of('/group');
    groupNamespace.on('connection', (socket) => {
        console.log('A user connected to group chat');

        // Handle group messages
        socket.on('group message', async (msg) => {
            try {
                const newGroupMessage = await groupMessageController.saveGroupMessage(msg.groupID, msg.senderID, msg.message);

                // Broadcast the group message to everyone in the group namespace
                groupNamespace.to(msg.groupID).emit('group message', msg);

                // Format the createdAt timestamp to a human-readable string
                const formattedTime = new Date(newGroupMessage.createdAt).toLocaleString();
                console.log(`Group message added to group ${msg.groupID}: " ${msg.message} " from ${msg.senderID} at ${formattedTime}`);

            } catch (error) {
                // Handle errors and emit an error message to the client
                console.error('Error handling group message:', error);
                socket.emit('error message', 'An error occurred while processing your group message');
            }
        });

        // Join the user to the group room
        socket.on('join group', (groupID) => {
            socket.join(groupID);
            console.log(`User joined group room: ${groupID}`);
        });

        // Handle disconnection
        socket.on('disconnect', () => {
            console.log('User disconnected from group chat');
        });
    });
}

module.exports = setupSocketServer;
