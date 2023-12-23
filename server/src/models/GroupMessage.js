// GroupMessage.js
const mongoose = require('mongoose');

const groupMessageSchema = new mongoose.Schema({
    groupID: {type: mongoose.Schema.Types.ObjectId, ref: 'Group'},
    senderID: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    message: String,
}, {
    timestamps: true // createdAt & updatedAt fields
});


groupMessageSchema.statics.saveGroupMessage = async function (groupID, senderID, message) {
    try {
        const newMessage = new this({groupID, senderID, message});

        await newMessage.save();
        // Update the Group collection to add the reference to the new GroupMessage
        await mongoose.model('Group').findByIdAndUpdate(groupID, {$push: {messages: newMessage._id}});

        return newMessage;
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error saving group message:', error);
        throw error;
    }
};

groupMessageSchema.statics.getAllGroupMessages = async function (groupID) {
    return this.find({
        groupID,
    }).sort({createdAt: 1});
};


const GroupMessage = mongoose.model('GroupMessage', groupMessageSchema);

module.exports = GroupMessage;
