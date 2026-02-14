'use client'

import { Video, Link2, Users } from 'lucide-react'

const steps = [
  {
    title: 'Create a Live Room',
    description:
      'Start a live streaming room instantly from your browser with zero setup.',
    icon: Video,
  },
  {
    title: 'Invite Guests',
    description:
      'Share a secure link and bring guests into your live session in seconds.',
    icon: Link2,
  },
  {
    title: 'Stream Together',
    description:
      'Go live with real-time video, audio, and chat powered by WebRTC.',
    icon: Users,
  },
]

export default function HowItWorks() {
  return (
    <section className="py-24 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-black">
            How StreamFlow Works
          </h2>
          <p className="mt-4 text-black">
            Launch live streams in minutes with a simple, browser-based workflow.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative p-8 rounded-xl bg-[#131325] border border-white/5 hover:border-[#7C3AED]/40 transition"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-lg bg-[#7C3AED]/10 flex items-center justify-center mb-6">
                <step.icon className="w-6 h-6 text-[#7C3AED]" />
              </div>

              <h3 className="text-xl font-medium text-[#EDEDF5]">
                {step.title}
              </h3>
              <p className="mt-3 text-sm text-[#EDEDF5]/70 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
