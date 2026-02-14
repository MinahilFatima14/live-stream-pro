const mongoose = require('mongoose')

const RoomSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },

  title: {
    type: String,
    default: 'Untitled Room',
    trim: true,
  },

  hostId: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    enum: ['waiting', 'live', 'ended'],
    default: 'waiting',
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Room', RoomSchema)