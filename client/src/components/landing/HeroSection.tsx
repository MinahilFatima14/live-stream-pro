'use client'

import Link from 'next/link'


export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[var(--background)]">
      
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2  w-[800px] h-[700px] bg-[#7C3AED]/20 rounded-full blur-[120px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full  text-[#EDEDF5] text-sm bg-[#A78BFA] mb-6">
          Real-time Browser Streaming
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-black leading-tight">
          Go Live Instantly.
          <br />
          <span className="text-[#7C3AED]">Stream Without Limits.</span>
        </h1>

        {/* Subheading */}
        <p className="mt-6 text-base md:text-lg text-black max-w-2xl mx-auto">
          A browser-based live streaming platform 
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          
          <Link
            href="/stream"
            className="w-full sm:w-auto px-8 py-3 rounded-xl bg-[#7C3AED] text-[#EDEDF5]font-medium hover:bg-[#6D28D9] transition shadow-lg shadow-[#7C3AED]/30"
          >
            Start Streaming
          </Link>

          <Link
            href="/demo"
            className="w-full sm:w-auto px-8 py-3 rounded-xl border bg-[#7C3AED] border-[#EDEDF5]/15 text-[#EDEDF5] hover:bg-[#6D28D9] transition"
          >
            View Demo
          </Link>
        </div>

      </div>
    </section>
  )
}
