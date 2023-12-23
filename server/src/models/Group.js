// models/Group.js

const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    admin: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    participants: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    groupName: {type: String},
    groupImage: {type: String},
    messages: [{type: mongoose.Schema.Types.ObjectId, ref: 'GroupMessage'}],
}, {
    timestamps: true // createdAt & updatedAt fields
});

// Create a new group with an image
groupSchema.statics.createGroupWithImage = async function (admin, participants, groupName, groupImage, groupId) {
    try {
        const adminUser = await mongoose.model('User').findById(admin);
        const participantUsers = await mongoose.model('User').find({_id: {$in: participants}});

        if (!adminUser || !participantUsers || participantUsers.length !== participants.length) {
            new Error('Invalid admin or participants');
        }

        const newGroup = new this({
            _id: groupId,
            admin,
            participants,
            groupName,
            groupImage: `/uploads/groups/${groupId}/groupImage/${groupImage}`,
        });

        // Save the group
        await newGroup.save();

        return newGroup;
    } catch (err) {
        throw new Error('Error creating group with image: ' + err.message);
    }
};

// Retrieve groups by user ID
groupSchema.statics.getAllGroupsByUserId = async function (userId) {
    try {
        // Find groups where the user is either the admin or a participant
        const groups = await this.find({
            $or: [
                {admin: userId},
                {participants: userId}
            ]
        }).populate([
            {path: 'admin', select: 'name profilePicture'},
            {path: 'participants', select: 'name profilePicture'},
            {
                path: 'messages',
                options: {sort: {createdAt: -1}, limit: 1},
                populate: {path: 'senderID', select: 'name profilePicture'}
            }
        ]);

        return groups.map(group => {
            const lastMessage = group.messages.length > 0 ? {
                content: group.messages[0].message,
                timestamp: group.messages[0].createdAt,
                sender: group.messages[0].senderID
            } : null;

            return {
                _id: group._id,
                admin: group.admin,
                participants: group.participants,
                groupName: group.groupName,
                groupImage: group.groupImage,
                lastMessage: lastMessage,
            };
        });
    } catch (err) {
        throw new Error('Error retrieving groups: ' + err.message);
    }
};

module.exports = mongoose.model('Group', groupSchema);
