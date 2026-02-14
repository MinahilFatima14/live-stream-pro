'use client'

import Link from 'next/link'

export default function FinalCTA() {
  return (
    <section className="py-28 bg-[var(--background)]">
      <div className="max-w-3xl mx-auto px-6 text-center">

        {/* Headline */}
        <h2 className="text-3xl md:text-5xl font-semibold text-black">
          Ready to Go Live?
        </h2>

        {/* Subheading */}
        <p className="mt-4 text-black text-lg md:text-xl">
          StreamFlow lets you broadcast instantly, with zero downloads, in real time.
        </p>

        {/* CTA Button */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/stream"
            className="px-10 py-4 rounded-2xl bg-[#7C3AED] text-[#EDEDF5] font-medium text-lg hover:bg-[#6D28D9] transition shadow-lg shadow-[#7C3AED]/40"
          >
            Start Streaming
          </Link>
        </div>

      </div>
    </section>
  )
}
