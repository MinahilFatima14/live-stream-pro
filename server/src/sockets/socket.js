const { Server } = require('socket.io')

let io

function initSocket(server) {
    io = new Server(server, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"]
        }
    })

    io.on('connection', (socket) => {
        console.log('User connected:', socket.id)

        // Join Stream Room
        socket.on('join-room', (roomId) => {
            socket.join(roomId)
            console.log(`User joined room ${roomId}`)
        })

        // Chat
        socket.on('chat-message', ({ roomId, message }) => {
            io.to(roomId).emit('chat-message', message)
        })

        // WebRTC Signaling (we will expand later)
        socket.on('signal', (data) => {
            socket.to(data.roomId).emit('signal', data)
        })

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id)
        })
    })
}

module.exports = { initSocket }
