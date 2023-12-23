// contactController.js

const User = require('../models/User');

async function getAllContacts(req, res) {
    try {
        const currentUserId = req.params.userId;

        // Exclude the current user from the query
        const users = await User.getAllContacts(currentUserId);

        return apiResponse(res, 200, 'success', 'Users retrieved successfully', users);
    } catch (err) {
        console.error(err);
        return apiResponse(res, 500, 'error', 'Internal server error', null);
    }
}

async function searchContacts(req, res) {
    const {userId} = req.params;
    const {query} = req.query;

    try {
        // Search for users by name or phone number
        const users = await User.searchContacts(userId, query);

        return apiResponse(res, 200, 'success', 'Contacts retrieved successfully', users);
    } catch (err) {
        console.error(err);
        return apiResponse(res, 500, 'error', 'Internal server error', null);
    }
}

async function getContactById(req, res) {
    const {contactId} = req.params;

    try {
        const contact = await User.getContactById(contactId);

        if (!contact) {
            return apiResponse(res, 404, 'error', 'Contact not found', null);
        }

        return apiResponse(res, 200, 'success', 'Contact retrieved successfully', contact);
    } catch (err) {
        console.error(err);
        return apiResponse(res, 500, 'error', 'Internal server error', null);
    }
}

module.exports = {
    getAllContacts,
    searchContacts,
    getContactById
};
