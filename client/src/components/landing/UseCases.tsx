'use client'

import { Mic, Monitor, User, Box } from 'lucide-react'

const useCases = [
  {
    title: 'Podcasts',
    description: 'Engage your audience with live audio and video sessions.',
    icon: Mic,
  },
  {
    title: 'Online Classes',
    description: 'Teach and interact with students in real-time.',
    icon: Monitor,
  },
  {
    title: 'Live Interviews',
    description: 'Stream interviews with guests effortlessly from the browser.',
    icon: User,
  },
  {
    title: 'Product Demos',
    description: 'Showcase products and features live to potential customers.',
    icon: Box,
  },
]

export default function UseCases() {
  return (
    <section className="py-28 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-black">
            Use Cases
          </h2>
          <p className="mt-4 text-black">
            StreamFlow fits perfectly in a variety of real-world scenarios.
          </p>
        </div>

        {/* Use Case Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="p-8 rounded-xl bg-[#131325] border border-white/5 hover:border-[#7C3AED]/40 transition flex flex-col items-start gap-4"
            >
              <div className="w-12 h-12 rounded-lg bg-[#7C3AED]/10 flex items-center justify-center">
                <useCase.icon className="w-6 h-6 text-[#7C3AED]" />
              </div>
              <h3 className="text-lg font-medium text-[#EDEDF5]">
                {useCase.title}
              </h3>
              <p className="text-sm text-[#EDEDF5]/70 leading-relaxed">
                {useCase.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
