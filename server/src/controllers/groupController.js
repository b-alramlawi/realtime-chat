// controllers/groupController.js

const Group = require('../models/Group');
const {imageUpload} = require('../utils/imageUpload');
const groupValidator = require('../validators/groupValidator');


const groupImageUpload = imageUpload('groups', 'groupImage', true);

async function createGroupWithImage(req, res) {
    groupImageUpload(req, res, async (err) => {
        if (err) {
            return apiResponse(res, 500, 'error', 'Failed to upload group image.', err.message);
        }

        try {
            // Validate the request body against the schema
            const validationResult = groupValidator.validate(req.body);
            if (validationResult.error) {
                return apiResponse(res, 400, 'error', validationResult.error.message, null);
            }

            const {admin, participants, groupName} = req.body;
            const groupImage = req.file ? req.file.filename : null;

            // Use the generated group ID from the request object
            const groupId = req.id;

            // Create a new group with an image using the model method
            const newGroup = await Group.createGroupWithImage(admin, participants, groupName, groupImage, groupId);

            const imageUrl = `/uploads/groups/${groupId}/groupImage/${groupImage}`;

            apiResponse(res, 201, 'success', 'Group created successfully', {imageUrl, newGroup});
        } catch (err) {
            console.error('Error creating group with image:', err);
            apiResponse(res, 500, 'error', 'Internal Server Error', err.message);
        }
    });
}

async function getAllGroupsByUserId(req, res) {
    try {
        const userId = req.params.userId;

        // Retrieve groups by user ID using the model method
        const groupsWithLastMessage = await Group.getAllGroupsByUserId(userId);

        apiResponse(res, 200, 'success', 'Groups retrieved successfully', groupsWithLastMessage);
    } catch (err) {
        console.error('Error retrieving groups:', err);
        apiResponse(res, 500, 'error', 'Internal Server Error', err.message);
    }
}

module.exports = {
    createGroupWithImage,
    getAllGroupsByUserId,
};
