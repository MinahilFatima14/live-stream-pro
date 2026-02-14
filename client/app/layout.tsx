import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/src/components/landing/Navbar'
import Footer from '@/src/components/landing/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'StreamFlow',
  description: 'Professional Live Streaming Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="overflow-y-scroll scrollbar-none  bg-[var(--background)] text-[var(--text-primary)] font-sans flex flex-col min-h-screen">
        
        {/* Navbar is fixed */}
        <Navbar />

        {/* Page content */}
        <main className="flex-1 relative z-0">
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  )
}
