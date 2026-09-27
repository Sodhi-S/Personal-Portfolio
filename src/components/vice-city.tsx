"use client"

import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"

// Easter egg: the 🌴 button in the top bar swaps the whole site into a
// Vice City theme. The theme itself is CSS, keyed off <html data-vice>.

const SWAP_MS = 550
const SPLASH_MS = 1500

type Splash = "vice" | "arcade"

function setVice(on: boolean) {
  if (on) document.documentElement.dataset.vice = ""
  else delete document.documentElement.dataset.vice
}

export function ViceCityToggle() {
  const [on, setOn] = useState(false)
  const [splash, setSplash] = useState<Splash | null>(null)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout)
      setVice(false)
    },
    [],
  )

  const toggle = () => {
    if (splash) return
    const next = !on
    setOn(next)
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVice(next)
      return
    }
    // Swap the theme while the splash fully covers the page.
    setSplash(next ? "vice" : "arcade")
    timers.current = [setTimeout(() => setVice(next), SWAP_MS), setTimeout(() => setSplash(null), SPLASH_MS)]
  }

  return (
    <>
      <button
        type="button"
        onClick={toggle}
        aria-pressed={on}
        aria-label={on ? "Back to arcade mode" : "Vice City mode"}
        className="w-9 h-9 flex items-center justify-center text-lg border-2 border-transparent cursor-pointer transition-all duration-200 hover:border-yellow-400 hover:bg-orange-500 hover:-rotate-12"
      >
        {on ? "🕹️" : "🌴"}
      </button>
      {splash && createPortal(<SplashScreen kind={splash} />, document.body)}
    </>
  )
}

function SplashScreen({ kind }: { kind: Splash }) {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-4 animate-vice-splash"
      style={{
        background:
          kind === "vice"
            ? "linear-gradient(to bottom, #12002b 0%, #3a0a5e 40%, #b0186e 72%, #ff7a3d 100%)"
            : "#000",
      }}
    >
      {kind === "vice" ? (
        <>
          <div className="vice-neon font-vice text-7xl md:text-9xl text-[#ff2e97] -rotate-6">Vice City</div>
          <div className="font-arcade text-[10px] md:text-xs tracking-[0.3em] text-[#7df9ff]">WELCOME TO THE 80s</div>
        </>
      ) : (
        <>
          <div className="font-arcade text-2xl md:text-4xl text-[#facc15]">WORLD 1-1</div>
          <div className="font-arcade text-[10px] md:text-xs tracking-[0.3em] text-[#f97316] animate-blink">PRESS START</div>
        </>
      )}
    </div>
  )
}
