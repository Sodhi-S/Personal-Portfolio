"use client"

import { forwardRef, useEffect, useRef, useState } from "react"
import { BOOT_SEEN_KEY as SEEN_KEY } from "@/lib/boot"

export const BOOT_TEXT =
  "> BOOTING PLAYER.EXE...\n> LEVEL: DATA & SOFTWARE ENGINEER\n> LOCATION: TORONTO, ON\n> INSERT COIN TO START"

const TYPE_SPEED_MS = 20
const HOLD_MS = 250
const MOVE_MS = 600
const HERO_TERMINAL_ID = "hero-terminal"

// The arcade terminal box. Shared by the hero and the boot screen so the boot
// box lines up exactly with the hero one when it slides into place.
export const Terminal = forwardRef<
  HTMLDivElement,
  { text: string; id?: string; style?: React.CSSProperties }
>(function Terminal({ text, id, style }, ref) {
  return (
    <div
      ref={ref}
      id={id}
      style={style}
      className="mx-auto max-w-xl bg-black border-4 border-yellow-400 p-4 text-left shadow-[0_0_20px_color-mix(in_oklab,var(--color-yellow-400)_25%,transparent)]"
    >
      <div className="text-yellow-400 font-arcade text-[9px] md:text-xs whitespace-pre-line leading-[2] min-h-[7.5rem] md:min-h-[8.5rem]">
        {text}
        <span className="animate-blink">█</span>
      </div>
    </div>
  )
})

export function HeroTerminal() {
  return <Terminal id={HERO_TERMINAL_ID} text={BOOT_TEXT} />
}

type Phase = "typing" | "moving" | "done"

// On first visit: black screen, the terminal types out the boot text in the
// middle, then slides up into its spot in the hero while the black fades away.
// Shown once per browser session.
export function BootScreen() {
  const [phase, setPhase] = useState<Phase>("typing")
  const [typed, setTyped] = useState("")
  const [width, setWidth] = useState<number>()
  const [offset, setOffset] = useState<{ x: number; y: number }>()
  const boxRef = useRef<HTMLDivElement>(null)

  const hero = () => document.getElementById(HERO_TERMINAL_ID)

  useEffect(() => {
    try {
      if (sessionStorage.getItem(SEEN_KEY)) {
        setPhase("done")
        return
      }
    } catch {}

    window.scrollTo(0, 0)
    document.documentElement.dataset.booting = ""
    const target = hero()
    if (target) setWidth(target.getBoundingClientRect().width)

    let i = 0
    const id = setInterval(() => {
      i++
      setTyped(BOOT_TEXT.slice(0, i))
      if (i >= BOOT_TEXT.length) {
        clearInterval(id)
        setTimeout(() => setPhase("moving"), HOLD_MS)
      }
    }, TYPE_SPEED_MS)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (phase === "done") {
      document.body.style.overflow = ""
      delete document.documentElement.dataset.booting
      try {
        sessionStorage.setItem(SEEN_KEY, "1")
      } catch {}
      return
    }
    document.body.style.overflow = "hidden"
    if (phase === "moving") {
      setTyped(BOOT_TEXT)
      const from = boxRef.current?.getBoundingClientRect()
      const to = hero()?.getBoundingClientRect()
      if (from && to) setOffset({ x: to.left - from.left, y: to.top - from.top })
      const t = setTimeout(() => setPhase("done"), MOVE_MS)
      return () => clearTimeout(t)
    }
  }, [phase])

  // Any click or key press skips the typing.
  useEffect(() => {
    if (phase !== "typing") return
    const skip = () => setPhase("moving")
    window.addEventListener("keydown", skip)
    window.addEventListener("pointerdown", skip)
    return () => {
      window.removeEventListener("keydown", skip)
      window.removeEventListener("pointerdown", skip)
    }
  }, [phase])

  if (phase === "done") return null

  const ease = `${MOVE_MS}ms cubic-bezier(0.65, 0, 0.35, 1)`

  return (
    <div
      id="boot-screen"
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      style={{
        backgroundColor: phase === "moving" ? "rgba(0,0,0,0)" : "rgb(0,0,0)",
        transition: `background-color ${ease}`,
      }}
      aria-hidden="true"
    >
      <Terminal
        ref={boxRef}
        text={typed}
        style={{
          width: width ?? "100%",
          maxWidth: width ? "none" : undefined,
          transform: offset ? `translate(${offset.x}px, ${offset.y}px)` : undefined,
          transition: `transform ${ease}`,
        }}
      />
    </div>
  )
}
