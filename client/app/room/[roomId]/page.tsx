'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import type { Room } from '@/src/types/room'

export default function RoomPage() {
  const { roomId } = useParams()

  const [room, setRoom] = useState<Room | null>(null)
  const [isHost, setIsHost] = useState<boolean>(false)

  useEffect(() => {
    const fetchRoom = async () => {
      const token = localStorage.getItem('token')

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/rooms/${roomId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const data = await res.json()
      setRoom(data.room)
      setIsHost(data.isHost)
    }

    fetchRoom()
  }, [roomId])

  if (!room) return <p>Loading room...</p>

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="bg-zinc-900 p-6 rounded-xl w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-2">
          {room.title || 'Untitled Room'}
        </h1>

        <p className="text-gray-400 mb-4">
          Room ID: {room.roomId}
        </p>

        {isHost ? (
          <button className="w-full bg-red-600 hover:bg-red-700 py-2 rounded-lg font-semibold">
            🎥 Start Stream
          </button>
        ) : (
          <p className="text-yellow-400">
            Waiting for host to start the stream…
          </p>
        )}
      </div>
    </div>
  )
}
