const Room = require('../models/Room.model')
const crypto = require('crypto')

const createRoom = async (req, res) => {
  try {
    const { uid } = req.user

    // Generate short unique roomId
    const roomId = crypto.randomBytes(4).toString('hex')

    const room = await Room.create({
      roomId,
      hostId: uid,
      status: 'waiting',
    })

    return res.status(201).json({
      roomId: room.roomId,
      roomUrl: `/room/${room.roomId}`,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Failed to create room' })
  }
}
const getRoomById = async (req, res) => {
  try {
    const { roomId } = req.params

    const room = await Room.findOne({ roomId })

    if (!room) {
      return res.status(404).json({ message: 'Room not found' })
    }

    return res.json({
      roomId: room.roomId,
      title: room.title,
      status: room.status,
      hostId: room.hostId,
      createdAt: room.createdAt,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Failed to fetch room' })
  }
}

module.exports = {
  createRoom,
  getRoomById,
}
