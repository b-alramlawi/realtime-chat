// authController.js

const User = require('../models/User');
const jwt = require('jsonwebtoken');
const {registrationSchema, verificationSchema} = require('../validators/authValidator');

const predefinedUserData = [
    {phoneNumber: '+201061268983', verificationCode: '1234'},
    {phoneNumber: '+12345678902', verificationCode: '5678'},
    {phoneNumber: '+98765432100', verificationCode: '4321'},
    {phoneNumber: '+1112223333', verificationCode: '9999'},
    {phoneNumber: '+11122233777', verificationCode: '7777'},
];

const maxAge = 3 * 24 * 60 * 60;

function generateToken(userId) {
    return jwt.sign({userId}, process.env.SECRET_KEY, {
        expiresIn: maxAge,
    });
}

async function loginUser(req, res) {
    const phoneNumber = req.body.phoneNumber;

    const {error} = registrationSchema.validate({phoneNumber});

    if (error) {
        return apiResponse(res, 400, 'error', error.details[0].message, null);
    }

    try {
        const user = await User.loginUser(phoneNumber);

        if (user.isVerified) {
            const token = generateToken(user._id);
            return apiResponse(res, 200, 'success', 'User logged in successfully', {user, token});
        } else {
            const newUserVerificationCode = predefinedUserData.find((u) => u.phoneNumber === phoneNumber
            )?.verificationCode;

            return apiResponse(res, 201, 'success', 'Verification code sent successfully', {
                user, verificationCode: newUserVerificationCode
            });
        }
    } catch (err) {
        console.error(err);
        return apiResponse(res, 500, 'error', 'Internal server error', null);
    }
}

async function verifyUser(req, res) {
    const phoneNumber = req.body.phoneNumber;
    const verificationCode = req.body.verificationCode;

    const {error} = verificationSchema.validate({phoneNumber, verificationCode});

    if (error) {
        return apiResponse(res, 400, 'error', error.details[0].message, null);
    }

    const result = await User.verifyUser(phoneNumber, verificationCode, predefinedUserData);

    if (result.success) {
        const token = generateToken(result.user._id);
        return apiResponse(res, 200, 'success', 'User authenticated successfully', {user: result.user, token});
    } else {
        return apiResponse(res, 400, 'error', result.message, null);
    }
}

async function logoutUser(req, res) {
    const token = req.headers.authorization;

    if (!token) {
        return apiResponse(res, 401, 'error', 'Token not provided', null);
    }
    // Clear the cookie by setting its expiration to a past date
    // res.cookie('token', '', {expires: new Date(0), httpOnly: true});

    return apiResponse(res, 200, 'success', 'User logged out successfully', null);
}

module.exports = {
    loginUser,
    verifyUser,
    logoutUser,
};
