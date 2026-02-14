'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-[#0B0B14] border-t border-white/5 py-4 ">
      <div className="max-w-8xl  px-6 flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Logo with Purple Background */}
        <div className="flex items-center gap-3">
          {/* <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-[#7C3AED] to-[#A78BFA] flex items-center justify-center"> */}
            {/* Replace with real logo image if available */}
            <Image
              src="/logo.png"
              alt="StreamFlow Logo"
              width={24}
              height={24}
              className="rounded-sm"
            />
          {/* </div> */}
          <span className="text-[#EDEDF5] font-semibold tracking-wide">
            StreamFlow
          </span>
        </div>


           {/* Copyright */}
        <div className="text-xs text-[#EDEDF5]/50 text-center md:text-right">
          &copy; {new Date().getFullYear()} StreamFlow. All rights reserved.
        </div>

        {/* Links */}
        <div className="flex gap-6 flex-wrap justify-center text-sm text-[#EDEDF5]/70">
          <Link href="#" className="hover:text-[#7C3AED] transition">
            Terms
          </Link>
          <Link href="#" className="hover:text-[#7C3AED] transition">
            Privacy
          </Link>
          <Link href="#" className="hover:text-[#7C3AED] transition">
            Contact
          </Link>
        </div>

     

      </div>
    </footer>
  )
}
