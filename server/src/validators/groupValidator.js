// validators/groupValidator.js

const Joi = require('joi');

const groupSchema = Joi.object({
    admin: Joi.string().required().messages({
        'any.required': 'Admin is required.',
        'string.empty': 'Admin cannot be empty.',
    }),
    participants: Joi.array().items(Joi.string()).required().messages({
        'any.required': 'Participants are required.',
        'array.base': 'Participants must be an array.',
        'array.empty': 'Participants cannot be empty.',
    }),
    groupName: Joi.string().required().messages({
        'any.required': 'Group name is required.',
        'string.empty': 'Group name cannot be empty.',
    }),
    groupImage: Joi.object()
        .keys({
            url: Joi.string().uri().required(),
            alt: Joi.string().allow('').max(255)
        })
        .messages({
            'object.base': 'Group image must be an object',
            'object.keys': 'Invalid keys in the Group image object',
            'string.uri': 'Invalid URL format for Group image',
            'string.max': 'Alt text must not exceed {#limit} characters'
        }),
    messages: Joi.array().items(Joi.string()).messages({
        'array.base': 'Messages must be an array.',
    }),
});

module.exports = groupSchema;
