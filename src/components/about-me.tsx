"use client"

import { useEffect, useState } from "react"
import { Avatar } from "@/components/pixel-avatar"
import { useSeenOnce } from "@/hooks/use-seen-once"

const PROFILE = [
  { label: "CLASS", value: "Data / Software Engineer" },
  { label: "HOMEBASE", value: "University of Waterloo" },
  { label: "LEVEL", value: "4th Year" },
  { label: "LOCATION", value: "Toronto, Canada" },
]

// Scores out of 10.
const STATS = [
  { label: "DATA ENGINEERING", value: 9 },
  { label: "BACKEND", value: 8 },
  { label: "SHIP SPEED", value: 9 },
  { label: "MUSIC TASTE", value: 10, note: "BEST" },
  { label: "CAFFEINE", value: 10, note: "BEST" },
]

const QUEST = [
  "An aspiring Data Engineer studying Systems Design Engineering, my experience spans from:",
  "- Small-scale projects",
  "- End-to-end projects",
  "- Working for startup companies.",
  "When I'm not working, you can find me in the gym pumping some iron, playing video games with my friends, or arguing about basketball.",
].join("\n")

const SEGMENTS = 10
const BAR_START_MS = 500
const BAR_STAGGER_MS = 220
const SEGMENT_MS = 45
const TYPE_SPEED_MS = 12
const QUEST_START_MS = BAR_START_MS + STATS.length * BAR_STAGGER_MS + SEGMENTS * SEGMENT_MS

function useTypewriter(text: string, start: boolean, delayMs: number, instant: boolean) {
  const [out, setOut] = useState("")
  useEffect(() => {
    if (!start) return
    if (instant) {
      setOut(text)
      return
    }
    let i = 0
    let id: ReturnType<typeof setInterval>
    const t = setTimeout(() => {
      id = setInterval(() => {
        i++
        setOut(text.slice(0, i))
        if (i >= text.length) clearInterval(id)
      }, TYPE_SPEED_MS)
    }, delayMs)
    return () => {
      clearTimeout(t)
      clearInterval(id)
    }
  }, [text, start, delayMs, instant])
  return out
}

export function AboutMe() {
  const { ref, seen, reduced } = useSeenOnce<HTMLDivElement>()
  const quest = useTypewriter(QUEST, seen, QUEST_START_MS, reduced)
  const questDone = quest.length === QUEST.length

  return (
    <section className="pt-24 pb-16 px-4">
      <div ref={ref} className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <div className="text-yellow-400 text-sm font-bold tracking-wider mb-2 eyebrow">&gt; PLAYER PROFILE...</div>
          <h2 className="pixel-title text-3xl md:text-4xl font-bold text-white mb-4">CHARACTER SELECT</h2>
        </div>

        <div className="grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-6 md:gap-8">
          {/* Player card */}
          <div
            className={`relative bg-black border-4 border-yellow-400 p-5 flex flex-col items-center text-center shadow-[0_0_20px_color-mix(in_oklab,var(--color-yellow-400)_25%,transparent)] ${seen ? (reduced ? "" : "animate-crt-on") : "opacity-0"
              }`}
          >
            <div className="absolute top-3 left-3 bg-orange-500 text-black font-arcade text-[10px] px-2 py-1 border-2 border-black">
              P1
            </div>

            <div className="relative w-full aspect-square mt-6 mb-5 border-4 border-orange-500 bg-gradient-to-b from-orange-500/20 to-yellow-400/5 flex items-end justify-center overflow-hidden">
              <div className="crt-scanlines pointer-events-none absolute inset-0" />
              <Avatar className="w-2/3 animate-idle-bob" />
            </div>

            <div className="font-arcade text-sm md:text-base leading-relaxed">
              <span className="text-yellow-400">SAHEJ</span> <span className="text-orange-500">SODHI</span>
            </div>
            <div className="mt-4 font-arcade text-[10px] text-yellow-400 tracking-widest animate-blink">▶ SELECTED</div>
          </div>

          {/* Profile + stats */}
          <div className="bg-black border-4 border-yellow-400 p-5 md:p-6 flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-3">
              {PROFILE.map((p, i) => (
                <div
                  key={p.label}
                  className={`border-2 border-orange-500 px-3 py-2 transition-all duration-500 ease-out ${seen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                    }`}
                  style={{ transitionDelay: reduced ? "0ms" : `${150 + i * 80}ms` }}
                >
                  <div className="font-arcade text-[8px] text-orange-500 mb-1">{p.label}</div>
                  <div className="text-yellow-400 text-sm font-bold leading-snug">{p.value}</div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              {STATS.map((s, i) => (
                <div key={s.label}>
                  <div className="flex justify-between items-baseline mb-1.5 gap-2">
                    <span className="font-arcade text-[9px] text-white">{s.label}</span>
                    <span className="font-arcade text-[9px] text-yellow-400">{s.note ?? `${s.value}/${SEGMENTS}`}</span>
                  </div>
                  <div className="flex gap-1" role="meter" aria-label={s.label} aria-valuemin={0} aria-valuemax={SEGMENTS} aria-valuenow={s.value}>
                    {Array.from({ length: SEGMENTS }, (_, seg) => {
                      const on = seg < s.value
                      return (
                        <div
                          key={seg}
                          className={`h-3 flex-1 border border-black transition-colors duration-75 ${seen && on ? (i % 2 ? "bg-orange-500" : "bg-yellow-400") : "bg-white/10"
                            }`}
                          style={{
                            transitionDelay: reduced ? "0ms" : `${BAR_START_MS + i * BAR_STAGGER_MS + seg * SEGMENT_MS}ms`,
                          }}
                        />
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* My Quest dialogue box */}
          <div className="md:col-span-2 relative bg-black border-4 border-yellow-400 p-5 md:p-6 pt-8 md:pt-9 mt-3">
            <div className="absolute -top-4 left-5 bg-yellow-400 text-black font-arcade text-[10px] px-3 py-2 border-2 border-orange-500">
              MY QUEST
            </div>
            {/* Invisible full text reserves the height so nothing jumps while typing */}
            <div className="grid text-white leading-relaxed whitespace-pre-line">
              <p className="invisible col-start-1 row-start-1" aria-hidden="true">{QUEST}</p>
              <p className="col-start-1 row-start-1" aria-label={QUEST}>
                {quest}
                {seen && !questDone && <span className="animate-blink text-yellow-400">█</span>}
              </p>
            </div>
            <div
              className={`absolute bottom-2 right-4 text-yellow-400 text-xs ${questDone ? "animate-bounce" : "invisible"}`}
              aria-hidden="true"
            >
              ▼
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
