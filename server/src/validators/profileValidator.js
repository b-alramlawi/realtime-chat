// validators/profileValidator.js

const Joi = require('joi');

// Validation schema for updating user profile information
const updateUserProfileValidation = Joi.object({
    name: Joi.string()
        .trim()
        .pattern(/^[a-zA-Z\s]+$/)// Allow only letters
        .min(2)
        .max(50)
        .messages({
            'string.base': 'Name must be a string',
            'string.empty': 'Name is required',
            'string.pattern.base': 'Name must contain only letters',
            'string.min': 'Name must be at least {#limit} characters long',
            'string.max': 'Name must not exceed {#limit} characters'
        }),
    status: Joi.string()
        .trim()
        .messages({
            'string.base': 'Status must be a string',
            'string.empty': 'Status is required',
        }),
    profilePicture: Joi.object()
});

module.exports = {
    updateUserProfileValidation
}
