"use client"

import { useEffect, useRef, useState } from "react"
import { WORK_EXPERIENCES } from "@/data/experience"

// How far down the viewport the timeline "pen" sits while scrolling.
const DRAW_LINE = 0.65

export function ExperienceSection() {
  const items = WORK_EXPERIENCES
  const listRef = useRef<HTMLOListElement>(null)
  // Fraction of the timeline drawn so far. Only ever grows, so it draws once.
  const [progress, setProgress] = useState(0)
  const [reached, setReached] = useState(0)

  useEffect(() => {
    const list = listRef.current
    if (!list) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(1)
      setReached(items.length)
      return
    }

    let frame = 0
    const update = () => {
      frame = 0
      const rect = list.getBoundingClientRect()
      const drawnPx = window.innerHeight * DRAW_LINE - rect.top
      const p = Math.min(1, Math.max(0, drawnPx / rect.height))
      const hit = Array.from(list.children).filter(
        (li) => (li as HTMLElement).dataset.item !== undefined && (li as HTMLElement).offsetTop + 24 <= drawnPx,
      ).length
      setProgress((prev) => Math.max(prev, p))
      setReached((prev) => Math.max(prev, hit))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      cancelAnimationFrame(frame)
    }
  }, [items.length])

  return (
    <section className="no-pixel py-24 px-4 bg-black">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <div className="text-orange-500 text-sm font-bold tracking-wider mb-2 eyebrow">&gt; BOSS BATTLES CLEARED...</div>
          <h2 className="pixel-title text-3xl md:text-4xl font-bold text-white mb-4">QUEST LOG</h2>
        </div>

        <ol ref={listRef} className="relative space-y-10">
          {/* Track and the fill that draws down it as you scroll */}
          <li aria-hidden="true" className="absolute top-0 bottom-0 left-3 md:left-1/2 w-1 -translate-x-1/2 bg-orange-500/25" />
          <li
            aria-hidden="true"
            className="absolute top-0 left-3 md:left-1/2 w-1 -translate-x-1/2 bg-yellow-400 shadow-[0_0_10px_color-mix(in_oklab,var(--color-yellow-400)_70%,transparent)] transition-[height] duration-300 ease-out"
            style={{ height: `${progress * 100}%` }}
          />

          {items.map((exp, index) => {
            const shown = index < reached
            const onLeft = index % 2 === 0
            return (
              <li
                key={index}
                data-item
                className={`relative pl-10 md:w-1/2 ${onLeft ? "md:pl-0 md:pr-10" : "md:ml-auto md:pl-10"}`}
              >
                {/* Timeline node */}
                <span
                  aria-hidden="true"
                  className={`absolute top-6 left-3 ${onLeft ? "md:left-full" : "md:left-0"} w-5 h-5 -translate-x-1/2 border-2 border-black transition-transform duration-300 ease-out ${shown ? "scale-100" : "scale-0"}`}
                  style={{ backgroundColor: exp.color, boxShadow: `0 0 12px ${exp.color}` }}
                />

                <div
                  className={`p-5 bg-yellow-400 border-4 border-orange-500 hover:scale-[1.02] transition-all duration-500 ease-out ${shown ? "opacity-100 translate-x-0" : `opacity-0 translate-x-8 ${onLeft ? "md:-translate-x-8" : ""}`
                    }`}
                >
                  <div className="inline-block px-2 py-1 mb-3 bg-black text-white text-xs font-bold border-2 border-orange-500 whitespace-nowrap">
                    {exp.dates}
                  </div>
                  <h3 className="text-lg font-bold text-black tracking-wider">{exp.company}</h3>
                  <div className="text-sm font-bold text-orange-600">{exp.role}</div>
                  {exp.location && <div className="text-xs font-bold text-black/70 mt-2">📍 {exp.location}</div>}
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
