// models/Message.js

const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
    {
        senderID: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        receiverID: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        message: String,
    },
    {
        timestamps: true, // createdAt & updatedAt fields
    }
);

// Save a new message
messageSchema.statics.saveMessage = async function (senderID, receiverID, message) {
    const newMessage = new this({
        senderID,
        receiverID,
        message,
    });

    await newMessage.save();
    const timestamp = newMessage.createdAt;
    return {newMessage, timestamp};
};

// Get all messages between two users
messageSchema.statics.getAllMessages = async function (senderID, receiverID) {
    return this.find({
        $or: [
            {senderID, receiverID},
            {senderID: receiverID, receiverID: senderID},
        ],
    }).sort({createdAt: 1});
};

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
