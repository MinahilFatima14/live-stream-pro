'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Video, Users } from 'lucide-react'

export default function Navbar() {
  const pathname = usePathname() // to highlight active page

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[var(--surface)] border-b border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#7C3AED] to-[#A78BFA]" />
          <span className="text-[var(--text-primary)] font-semibold tracking-wide">
            StreamFlow
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          {/* Get Started */}
          <Link
            href="/register"
            className={`px-4 py-2 rounded-lg font-medium transition ${
              pathname === '/register'
                ? 'bg-gradient-to-tr from-[#7C3AED] to-[#A78BFA] text-white'
                : 'text-[var(--text-primary)] hover:bg-[var(--primary-hover)] hover:text-white'
            }`}
          >
            Get Started
          </Link>

          {/* Login */}
          <Link
            href="/login"
            className={`px-4 py-2 rounded-lg font-medium transition ${
              pathname === '/login'
                ? 'bg-gradient-to-tr from-[#7C3AED] to-[#A78BFA] text-white'
                : 'text-[var(--text-primary)] hover:bg-[var(--primary-hover)] hover:text-white'
            }`}
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  )
}
