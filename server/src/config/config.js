// config/config.js
require('dotenv').config();

// config.js
const baseUrl = process.env.BASE_URL
const secretKey = process.env.SECRET_KEY
const databaseUrl = process.env.MONGODB_URI
const port = process.env.PORT || 5000;
const twilioSid = process.env.TWILIO_SID
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER

module.exports = {
    baseUrl, secretKey, databaseUrl, port
};
