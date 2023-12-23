// models/User.js

const mongoose = require('mongoose');
const fs = require('fs');

const userSchema = new mongoose.Schema({
    phoneNumber: {type: String, required: true, unique: true},
    verificationCode: {type: String},
    isVerified: {type: Boolean, default: false},
    name: {type: String},
    status: {type: String},
    profilePicture: {type: String},
}, {
    timestamps: true // createdAt & updatedAt fields
});

userSchema.statics.loginUser = async function (phoneNumber) {
    let existingUser = await this.findOne({phoneNumber});

    if (!existingUser) {
        existingUser = new this({phoneNumber, isVerified: false});
        await existingUser.save();
    }

    return existingUser;
};


userSchema.statics.verifyUser = async function (phoneNumber, verificationCode, predefinedUserData) {
    const user = await this.findOne({phoneNumber});

    if (!user) {
        return {success: false, message: 'Invalid phone number or verification code'};
    }

    const expectedVerificationCode = predefinedUserData.find(
        (u) => u.phoneNumber === phoneNumber
    )?.verificationCode;

    if (verificationCode !== expectedVerificationCode) {
        return {success: false, message: 'Invalid phone number or verification code'};
    }

    // Allow re-verification even if user is already verified
    user.isVerified = true;
    await user.save();

    return {success: true, user};
};


userSchema.statics.getAllContacts = async function (currentUserId) {
    // Exclude the current user from the query
    return this.find({_id: {$ne: currentUserId}}, 'name phoneNumber status profilePicture');
};

userSchema.statics.searchContacts = async function (userId, query) {
    // Search for users by name or phone number
    return this.find({
        _id: {$ne: userId}, // Exclude the current user
        $or: [
            {name: {$regex: query, $options: 'i'}}, // Search by name (case-insensitive)
            {phoneNumber: {$regex: query, $options: 'i'}}, // Search by phone number (case-insensitive)
        ],
    }, 'name phoneNumber status profilePicture');
};

userSchema.statics.getContactById = async function (contactId) {
    return this.findById(contactId, 'name phoneNumber status profilePicture');
};


// Update user profile information and profile picture
userSchema.statics.updateProfile = async function (userId, updatedUserData, newFileName) {
    try {
        if (newFileName) {
            // Find the user to get the old profile picture filename
            const user = await this.findById(userId);
            const oldFileName = user.profilePicture;

            // Check if an old profile picture exists and if it does, delete it
            if (oldFileName && fs.existsSync(oldFileName)) {
                fs.unlinkSync(oldFileName); // Delete the old image file
            }

            // Update the user's profile picture field in the database with the new filename
            updatedUserData.profilePicture = newFileName;
        }

        // Update the user information
        return await this.findByIdAndUpdate(userId, updatedUserData, {new: true});
    } catch (error) {
        throw new Error('Error updating user profile: ' + error.message);
    }
};

// Retrieve user information by ID
userSchema.statics.getUserById = async function (userId) {
    try {
        return await this.findById(userId);
    } catch (error) {
        throw new Error('Error retrieving user by ID: ' + error.message);
    }
};

module.exports = mongoose.model('User', userSchema);
