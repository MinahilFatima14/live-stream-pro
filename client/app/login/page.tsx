'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  signInWithEmailAndPassword,
  signInAnonymously,
  // createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from 'firebase/auth'
import { auth } from '@/src/firebase'

export default function LoginPage() {
  const router = useRouter()

  // Form states
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(true)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // ----- Handle Email/Password Login -----
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Set persistence based on Remember Me checkbox
      const persistence = rememberMe ? browserLocalPersistence : browserSessionPersistence
      await setPersistence(auth, persistence)

      const userCredential = await signInWithEmailAndPassword(auth, email, password)

// ✅ GET TOKEN
const token = await userCredential.user.getIdToken()

// ✅ SAVE TOKEN
localStorage.setItem('token', token)

router.push('/dashboard')

    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // ----- Handle Guest Login -----
  const handleGuestLogin = async () => {
    setError('')
    setLoading(true)
    try {
      const userCredential = await signInAnonymously(auth)

// ✅ GET TOKEN
const token = await userCredential.user.getIdToken()

// ✅ SAVE TOKEN
localStorage.setItem('token', token)

router.push('/dashboard')
await signInAnonymously(auth)
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // ----- Handle Password Reset -----
  const handleResetPassword = async () => {
    setError('')
    if (!email) {
      setError('Enter your email to reset password')
      return
    }
    try {
      await sendPasswordResetEmail(auth, email)
      alert('Password reset email sent!')
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--background)]">
      <div className="bg-[var(--surface)] p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-6">Login</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* ----- Login Form ----- */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
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

          {/* Remember Me */}
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 accent-[#7C3AED]"
            />
            Remember Me
          </label>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 py-2 bg-gradient-to-tr from-[#7C3AED] to-[#A78BFA] text-white font-semibold rounded-lg hover:opacity-90 transition"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Forgot Password */}
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          <button
            type="button"
            onClick={handleResetPassword}
            className="text-[#7C3AED] hover:underline"
          >
            Forgot Password?
          </button>
        </p>

        {/* Login as Guest */}
        <button
          type="button"
          onClick={handleGuestLogin}
          className="mt-4 py-2 bg-gray-700 text-white font-semibold rounded-lg hover:opacity-90 transition w-full"
        >
          Login as Guest
        </button>

        {/* Link to Register */}
        <p className="mt-4 text-sm text-[var(--text-secondary)] text-center">
          Don't have an account?{' '}
          <a href="/register" className="text-[#7C3AED] hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  )
}
