const express = require('express')
const router = express.Router()

const firebaseAuth = require('../middlewares/firebaseAuth')
const {
  createRoom,
  getRoomById,
} = require('../controllers/room.controller')

// CREATE ROOM
router.post('/', firebaseAuth, createRoom)

// GET ROOM BY ID  ✅ THIS IS CRITICAL
router.get('/:roomId', firebaseAuth, getRoomById)

module.exports = router
