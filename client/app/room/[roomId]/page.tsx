'use client'

import { useEffect, useRef, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { auth } from '@/src/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import type { Room } from '@/src/types/room'
import Peer from 'peerjs'
import { socket } from '@/src/lib/socket'



export default function RoomPage() {
  const { roomId } = useParams()
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null)

  const [room, setRoom] = useState<Room | null>(null)
  const [isHost, setIsHost] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const peerRef = useRef<Peer | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [isStreaming, setIsStreaming] = useState(false)

   // 🔹 Setup PeerJS + Socket
  useEffect(() => {
    
    const peer = new Peer()
    peerRef.current = peer

   peer.on("open", (peerId) => {
  console.log("Peer connected with id:", peerId)

  socket.emit("join-room", {
    roomId,
    peerId,
  })
})


    peer.on('call', (call) => {
  if (streamRef.current) {
    call.answer(streamRef.current)
  }
})


socket.on('user-joined', (peerId: string) => {
  if (isHost && streamRef.current) {
    const call = peerRef.current!.call(peerId, streamRef.current)
  }

  if (!isHost) {
    const emptyStream = new MediaStream()
    const call = peerRef.current!.call(peerId, emptyStream)

    call.on('stream', (remoteStream: MediaStream) => {
      if (videoRef.current) {
        videoRef.current.srcObject = remoteStream
        videoRef.current.play()
      }
    })
  }
})

      return () => {
      peer.destroy()
      socket.off()
    }
  }, [roomId, isHost])

  
  const startStream = async () => {
  if (!peerRef.current) return

  try {
    // Capture host media
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    })
    streamRef.current = stream
    setIsStreaming(true)

    // Show host preview
    if (videoRef.current) {
      videoRef.current.srcObject = stream
      videoRef.current.muted = true
      await videoRef.current.play()
    }

    // Notify server to broadcast
    socket.emit('start-stream', { roomId, peerId: peerRef.current.id })
  } catch (err) {
    console.error('Error starting stream:', err)
  }
}


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push('/login')
        return
      }

      try {
        const token = await user.getIdToken()

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/rooms/${roomId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        if (!res.ok) {
          throw new Error('Room not found')
        }

        const data = await res.json()

        setRoom(data)
        setIsHost(data.hostId === user.uid)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [roomId, router])

  if (loading) return <p className="text-white p-6">Loading room...</p>

  if (error)
    return <p className="text-red-500 p-6">{error}</p>

  if (!room) return null

return (
  <div className="min-h-screen bg-[var(--background)] flex items-center justify-center px-4">
    <div className="w-full max-w-lg bg-[var(--surface)] backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/10">

      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-[var(--text-primary)]">
          {room.title || 'Untitled Room'}
        </h1>

        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          Room ID: <span className="font-mono">{room.roomId}</span>
        </p>
      </div>

      {/* Status Card */}
      <div className="bg-black/30 rounded-xl p-5 text-center border border-white/5">
       {isHost ? (
          <button
  disabled={isStreaming}
  onClick={startStream}
  className={`w-full py-2 rounded-lg font-semibold text-white 
    ${isStreaming ? "bg-gray-500" : "bg-red-600 hover:bg-red-700"}`}
>
  {isStreaming ? "Streaming..." : "Start Stream"}
</button>

        ) : (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="rounded-xl w-full mt-4"
          />
        )}
      </div>

    </div>
  </div>
)

}
