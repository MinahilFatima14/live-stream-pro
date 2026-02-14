'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from '@/src/firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError("Passwords don't match")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    setLoading(true)
    try {
     const userCredential = await createUserWithEmailAndPassword(auth, email, password)
await updateProfile(userCredential.user, { displayName: name })

// ✅ GET FIREBASE ID TOKEN
const token = await userCredential.user.getIdToken()

// ✅ SAVE TOKEN
localStorage.setItem('token', token)

setLoading(false)
router.push('/dashboard')

    } catch (err: any) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--background)]">
      <div className="bg-[var(--surface)] p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-6">Register</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="px-4 py-2 rounded-lg bg-[#131325] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="px-4 py-2 rounded-lg bg-[#131325] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="px-4 py-2 rounded-lg bg-[#131325] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="px-4 py-2 rounded-lg bg-[#131325] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-2 py-2 bg-gradient-to-tr from-[#7C3AED] to-[#A78BFA] text-white font-semibold rounded-lg hover:opacity-90 transition"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="mt-4 text-sm text-[var(--text-secondary)]">
          Already have an account?{' '}
          <a href="/login" className="text-[#7C3AED] hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  )
}
