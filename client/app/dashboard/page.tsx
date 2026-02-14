'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from '@/src/firebase'
import { onAuthStateChanged, signOut, User } from 'firebase/auth'
import { Room } from '@/src/types/room'

export default function DashboardPage() {
  const router = useRouter()

  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [creatingRoom, setCreatingRoom] = useState(false)
  const [error, setError] = useState('')

  // 🔐 Auth protection
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push('/login')
        return
      }
      setUser(currentUser)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [router])

  // 🚀 Create Room
  const handleCreateRoom = async () => {
    try {
      setCreatingRoom(true)
      setError('')

      const token = await user?.getIdToken()

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/rooms/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (!res.ok) {
        throw new Error('Failed to create room')
      }

      const data = await res.json()

      router.push(`/room/${data.roomId}`)
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setCreatingRoom(false)
    }
  }

  const handleLogout = async () => {
    await signOut(auth)
    router.push('/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <p className="text-[var(--text-primary)]">Loading dashboard...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-[var(--surface)] rounded-2xl p-10 shadow-xl text-center">

        <h1 className="text-3xl font-bold text-[var(--text-primary)]">
          StreamFlow Dashboard
        </h1>

        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          {user?.isAnonymous
            ? 'Logged in as Guest'
            : `Logged in as ${user?.email}`}
        </p>

        {/* Error */}
        {error && (
          <p className="mt-4 text-red-400 text-sm">{error}</p>
        )}

        {/* Primary CTA */}
        <button
          onClick={handleCreateRoom}
          disabled={creatingRoom}
          className="mt-8 w-full py-3 rounded-xl text-white font-semibold
          bg-gradient-to-tr from-[#7C3AED] to-[#A78BFA]
          hover:opacity-90 transition disabled:opacity-50"
        >
          {creatingRoom ? 'Creating Room...' : 'Create New Room'}
        </button>

        {/* Divider */}
        <div className="my-6 h-px bg-white/10" />

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="text-sm text-[var(--text-secondary)] hover:text-white transition"
        >
          Logout
        </button>
      </div>
    </div>
  )
}
