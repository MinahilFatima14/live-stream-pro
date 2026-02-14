'use client'

import {
  Video,
  MessageSquare,
  ScreenShare,
  Shield,
  Webhook,
} from 'lucide-react'

const features = [
  {
    title: 'Real-time Video & Audio',
    description:
      'Ultra-low latency streaming powered by WebRTC and peer-to-peer connections.',
    icon: Video,
  },
  {
    title: 'Live Chat',
    description:
      'Instant messaging using persistent WebSocket connections.',
    icon: MessageSquare,
  },
  {
    title: 'Screen Sharing',
    description:
      'Share your screen seamlessly during live sessions and demos.',
    icon: ScreenShare,
  },
  {
    title: 'Role-based Rooms',
    description:
      'Host and Guest roles with controlled access and permissions.',
    icon: Shield,
  },
  {
    title: 'Webhooks',
    description:
      'Receive real-time stream events for automation and integrations.',
    icon: Webhook,
  },
]

export default function CoreFeatures() {
  return (
    <section className="py-28   bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-black">
            Core Features
          </h2>
          <p className="mt-4 text-black">
            Everything you need to stream, collaborate, and engage in real time.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative p-8 rounded-xl bg-[#131325] border border-white/5 hover:border-[#7C3AED]/40 transition"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-lg bg-[#7C3AED]/10 flex items-center justify-center mb-6">
                <feature.icon className="w-6 h-6 text-[#7C3AED]" />
              </div>

              <h3 className="text-lg font-medium text-[#EDEDF5]">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm text-[#EDEDF5]/70 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
