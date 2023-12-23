// models/Conversation.js

const mongoose = require('mongoose');
const User = require('./User');


const conversationSchema = new mongoose.Schema(
    {
        participants: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
        messages: [{type: mongoose.Schema.Types.ObjectId, ref: 'Message'}],
        conversationName: {type: String},
        conversationImage: {type: String},
    },
    {
        timestamps: true, // createdAt & updatedAt fields
    }
);

// Get or create a conversation between two participants
conversationSchema.statics.getOrCreateConversation = async function (participant1, participant2) {
    const existingConversation = await this.findOne({
        participants: {$all: [participant1, participant2]},
    });

    if (existingConversation) {
        return existingConversation;
    }

    const userParticipant2 = await User.findById(participant2);

    const newConversation = new this({
        participants: [participant1, participant2],
        messages: [],
        conversationName: userParticipant2.name,
        conversationImage: userParticipant2.profilePicture,
    });

    await newConversation.save();
    return newConversation;
};

// Get all conversations for a user with participant data and the last message
conversationSchema.statics.getAllConversationsByUserId = async function (userId) {
    const conversations = await this.find({
        participants: userId,
    }).populate([
        {path: 'participants'},
        {path: 'messages', options: {sort: {createdAt: -1}, limit: 1}},
    ]);

    return conversations.map((conversation) => {
        const participantsData = conversation.participants.map(participant => ({
            id: participant._id,
            userData: participant.toObject(),
        }));

        const secondParticipant = participantsData.find(participant => participant.id !== userId);

        return {
            _id: conversation._id,
            participants: participantsData,
            conversationName: secondParticipant ? secondParticipant.userData.name : '',
            conversationImage: secondParticipant ? secondParticipant.userData.profilePicture : '',
            lastMessage: conversation.messages.length > 0 ? {
                content: conversation.messages[0].message,
                timestamp: conversation.messages[0].createdAt,
            } : null,
            createdAt: conversation.createdAt,
            updatedAt: conversation.updatedAt,
        };
    });
};

const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;
