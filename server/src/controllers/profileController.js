// controllers/profileController.js

const User = require('../models/User');
const {updateUserProfileValidation} = require('../validators/profileValidator');
const {imageUpload} = require('../utils/imageUpload');

const profileImageUpload = imageUpload('users', 'profilePicture');

async function updateProfile(req, res) {
    try {
        const userId = req.params.userId;

        // Call the file upload middleware
        profileImageUpload(req, res, async (err) => {
            if (err) {
                return apiResponse(res, 500, 'error', 'Failed to upload profile picture.', err.message);
            }

            // Validate the request data against the schema
            const {error} = updateUserProfileValidation.validate(req.body);

            if (error) {
                return apiResponse(res, 400, 'error', error.message, null);
            }

            const updatedUserData = req.body;

            // Check if a file was uploaded
            let newFileName; // Declare newFileName outside the if block
            if (req.file) {
                newFileName = `uploads/users/${userId}/profilePicture/${req.file.filename}`;
            }

            // Update the user profile using the model method
            const updatedUser = await User.updateProfile(userId, updatedUserData, newFileName);

            // Construct the URL for the new image
            return apiResponse(res, 200, 'success', 'Profile updated successfully.', updatedUser);
        });
    } catch (error) {
        console.error('Error while updating profile and picture field:', error);
        return apiResponse(res, 500, 'error', 'Internal server error', null);
    }
}

async function getUserById(req, res) {
    try {
        const userId = req.params.userId;
        const user = await User.getUserById(userId);

        if (!user) {
            return apiResponse(res, 404, 'error', 'User not found', null);
        }

        return apiResponse(res, 200, 'success', 'User found', user);
    } catch (error) {
        console.error('Error while retrieving user by ID:', error);
        return apiResponse(res, 500, 'error', 'Internal server error', null);
    }
}

module.exports = {
    updateProfile,
    getUserById,
};

