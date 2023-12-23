// server.js

const http = require('http');
const app = require('./app');
const config = require('./config/config');
const socketSetup = require('./socket/socket');

const server = http.createServer(app);
const PORT = config.port;

// Set up the chat server using the same HTTP server
socketSetup(server);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
