// validators/authValidator.js
const Joi = require('joi');

// Validation schema for user registration
const registrationSchema = Joi.object({
    phoneNumber: Joi.string()
        .trim() // Remove leading and trailing whitespaces
        .pattern(/^\+\d{1,3}\d{10,14}$/) // Match international phone number format
        .required()
        .messages({
            'string.base': 'Phone number must be a string',
            'string.empty': 'Phone number is required',
            'string.pattern.base': 'Invalid phone number format. Use international format, e.g., +1234567890'
        }),
});

// Validation schema for verification
const verificationSchema = Joi.object({
    phoneNumber: Joi.string()
        .trim()
        .pattern(/^\+\d{1,3}\d{10,14}$/)
        .required()
        .messages({
            'string.base': 'Phone number must be a string',
            'string.empty': 'Phone number is required',
            'string.pattern.base': 'Invalid phone number format. Use international format, e.g., +1234567890'
        }),

    verificationCode: Joi.string()
        .trim()
        .pattern(/^\d{4}$/) // Assuming a 6-digit verification code, adjust as needed
        .required()
        .messages({
            'string.base': 'Verification code must be a string',
            'string.empty': 'Verification code is required',
            'string.pattern.base': 'Verification code must be a 4-digit number'
        }),
});

module.exports = {
    registrationSchema, verificationSchema
};
