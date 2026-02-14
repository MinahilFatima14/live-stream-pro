const express = require('express')
const http = require('http')
const cors = require('cors')
const { PeerServer } = require('peer')
require('dotenv').config()
require('./config/firebaseAdmin')


const connectDB = require('./config/db')
const { initSocket } = require('./sockets/socket')
const roomRoutes = require('./routes/room.routes')

const app = express()
const server = http.createServer(app)

// Middlewares
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(express.json())
app.use('/api/rooms', roomRoutes)

// DB Connection
connectDB()

// Initialize Socket
initSocket(server)

// PeerJS Server (Media Relay)
PeerServer({
    port: 9000,
    path: '/mypeer'
})

app.get('/', (req, res) => {
    res.send('Backend running')
})

const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
