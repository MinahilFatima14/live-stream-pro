const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const { PeerServer } = require('peer');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

// 1. Middlewares
app.use(cors());
app.use(express.json());

// 2. Socket.io Setup (Signaling Server)
const io = new Server(server, {
    cors: {
        origin: "*", 
        methods: ["GET", "POST"]
    }
});

// 3. PeerJS Server (Media Relay)
const peerServer = PeerServer({ port: 9000, path: '/mypeer' });

// 4. Socket Logic Connection
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
    
 
    
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});