"use client"

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { User } from "lucide-react"
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface OnClickProps {
  onclick: React.MouseEventHandler<HTMLButtonElement>;
}

const NavBar: React.FC<OnClickProps> = ({ onclick }) => (
  <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
    <div className="flex items-center">
      <div className="h-10 mr-2 flex items-center justify-center animate-bounce">
        <Image
          src='/logo.png'
          alt="PDF TALK Logo"
          width={60}
          height={60}
          className="pixelated"
        />
      </div>
      <span className="text-xl font-bold pixel-text">PDF TALK</span>
    </div>
    <Button
      variant="outline"
      className="pixel-border bg-white text-black hover:bg-gray-300 hover:text-black border-2 border-black transition-colors duration-200"
      onClick={onclick}>
      <User className="mr-2 h-4 w-4" /> Sign In
    </Button>
  </nav>
)

const PixelatedBackground: React.FC = () => (
  <div className="absolute inset-0 z-0 opacity-10">
    <div className="grid grid-cols-20 grid-rows-20 h-full w-full">
      {[...Array(400)].map((_, i) => (
        <div key={i} className="bg-gray-500 border border-gray-600"></div>
      ))}
    </div>
  </div>
)

const FloatingIcons: React.FC = () => {
  const icons = ['📄', '💬', '🤖', '🔍', '📚']
  return (
    <>
      {icons.map((icon, index) => (
        <div
          key={index}
          className="absolute text-4xl animate-float"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${5 + Math.random() * 5}s`
          }}
        >
          {icon}
        </div>
      ))}
    </>
  )
}

const HeroSection: React.FC<OnClickProps> = ({ onclick }) => {
  const [typedText, setTypedText] = useState('')
  const fullText = "Revolutionize your document interactions with AI-powered conversations"

  useEffect(() => {
    let i = 0
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(prev => prev + fullText.charAt(i))
        i++
      } else {
        clearInterval(typingInterval)
      }
    }, 50)

    return () => clearInterval(typingInterval)
  }, [])

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-gray-900 text-white p-4 overflow-hidden">
      <PixelatedBackground />
      <FloatingIcons />
      <h1 className="text-4xl md:text-6xl font-bold text-center mb-6 pixel-text z-10">Welcome to PDF TALK</h1>
      <p className="text-xl md:text-2xl text-center mb-8 max-w-2xl pixel-text z-10">
        {typedText}
      </p>
      <Button
        className="pixel-border text-lg px-8 py-4 bg-red-500 hover:bg-red-600 text-white transition-colors duration-200 z-10 animate-pulse"
        onClick={onclick}
      >
        Get Started
      </Button>
    </div>
  )
}

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-900" style={{ fontFamily: "'Press Start 2P', cursive" }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        
        .pixelated {
          image-rendering: pixelated;
          image-rendering: crisp-edges;
        }
        
        .pixel-border {
          box-shadow: 
            -4px 0 0 0 #000,
            4px 0 0 0 #000,
            0 -4px 0 0 #000,
            0 4px 0 0 #000;
        }

        .pixel-text {
          text-shadow: 
            2px 2px 0 #000,
            -2px -2px 0 #000,
            2px -2px 0 #000,
            -2px 2px 0 #000;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      <NavBar onclick={() => router.push('/signin')} />
      <HeroSection onclick={() => router.push('/signin')} />
    </div>
  )
}