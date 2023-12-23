// app.js

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {apiResponse} = require('./helpers/apiResponse');
const route = require('./routes/api');
const cors = require('cors');

// Database connection setup.
require('./config/db');

// Global variable for API response helper
global.apiResponse = apiResponse;

// Middleware.
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/chat/api', route);

module.exports = app;
