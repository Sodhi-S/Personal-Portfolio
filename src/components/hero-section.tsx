"use client"

import { Button } from "@/components/ui/button"
import RaceCarGameModal from "@/components/RaceCarGameModal"
import { useEffect, useState } from "react"

function Ghost({ color }: { color: string }) {
  return (
    <svg className="ghost-svg" viewBox="0 0 28 28" aria-hidden="true">
      <path
        d="M14 2C7.9 2 3 6.9 3 13V25L5.75 22L8.5 25L11.25 22L14 25L16.75 22L19.5 25L22.25 22L25 25V13C25 6.9 20.1 2 14 2Z"
        fill={color}
      />
      <circle cx="10.5" cy="12.5" r="3" fill="#fff" />
      <circle cx="17.5" cy="12.5" r="3" fill="#fff" />
      <circle cx="11.8" cy="12.5" r="1.5" fill="#1d4ed8" />
      <circle cx="18.8" cy="12.5" r="1.5" fill="#1d4ed8" />
    </svg>
  )
}

function useTypewriter(text: string, speed = 40) {
  const [out, setOut] = useState("")
  useEffect(() => {
    setOut("")
    let i = 0
    const id = setInterval(() => {
      i++
      setOut(text.slice(0, i))
      if (i >= text.length) clearInterval(id)
    }, speed)
    return () => clearInterval(id)
  }, [text, speed])
  return out
}

export function HeroSection() {
  const bootText =
    "> BOOTING PLAYER.EXE...\n> LEVEL: DATA & SOFTWARE ENGINEER\n> LOCATION: TORONTO, ON\n> INSERT COIN TO START"
  const typed = useTypewriter(bootText, 32)

  return (
    <section className="relative pt-32 pb-44 px-4 overflow-hidden">
      {/* CRT scanline overlay */}
      <div className="crt-scanlines pointer-events-none absolute inset-0 z-0" />

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center space-y-8">
          {/* Mario-style title */}
          <div className="space-y-6">
            <h1 className="text-3xl md:text-5xl font-bold leading-[1.4] tracking-wider">
              <span className="text-yellow-400">SAHEJ</span>
              <span> </span>
              <span className="text-orange-500">SODHI</span>
            </h1>

            {/* Arcade terminal */}
            <div className="mx-auto max-w-xl bg-black border-4 border-yellow-400 p-4 text-left shadow-[0_0_20px_rgba(250,204,21,0.25)]">
              <div className="text-yellow-400 font-arcade text-[9px] md:text-xs whitespace-pre-line leading-[2] min-h-[7.5rem] md:min-h-[8.5rem]">
                {typed}
                <span className="animate-blink">█</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4 flex-wrap font-arcade">
            <div className="w-24 h-24 bg-yellow-400 border-4 border-orange-500 flex flex-col items-center justify-center gap-2 text-black font-bold">
              <div className="text-lg">3+</div>
              <div className="text-[8px] tracking-wider">YEARS</div>
            </div>
            <div className="w-24 h-24 bg-orange-500 border-4 border-yellow-400 flex flex-col items-center justify-center gap-2 text-black font-bold">
              <div className="text-lg">5+</div>
              <div className="text-[8px] tracking-wider">PROJECTS</div>
            </div>
            <div className="w-24 h-24 bg-yellow-400 border-4 border-orange-500 flex flex-col items-center justify-center gap-2 text-black font-bold">
              <div className="text-3xl font-sans leading-none">∞</div>
              <div className="text-[8px] tracking-wider">IDEAS</div>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <RaceCarGameModal />
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-black font-bold px-8 border-4 border-yellow-400 hover:text-black"
              >
                VIEW RESUME
              </Button>
            </a>
          </div>

          {/* Blinking arcade prompt */}
          <div className="text-yellow-400 font-arcade text-sm font-bold tracking-[0.2em] animate-blink">
            ▶ PRESS START ◀
          </div>

          <div className="flex justify-center mt-8">
            <div className="pac-stage" aria-hidden="true">
              <span className="pac-dot d1" />
              <span className="pac-dot d2" />
              <span className="pac-dot d3" />
              <span className="pac-dot d4" />
              <span className="pac-dot d5" />
              <span className="pac-dot d6" />
              <div className="ghost-runner g1">
                <Ghost color="#FF0000" />
              </div>
              <div className="ghost-runner g2">
                <Ghost color="#FFB8FF" />
              </div>
              <div className="ghost-runner g3">
                <Ghost color="#00FFFF" />
              </div>
              <div className="ghost-runner g4">
                <Ghost color="#FFB852" />
              </div>
              <div className="pac-runner">
                <div className="pacman" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
