"use client"

import { useEffect, useId, useRef, useState, type CSSProperties } from "react"
import { projects, type Project, type Tier } from "@/data/projects"
import { useSeenOnce } from "@/hooks/use-seen-once"

const SHELVES: { tier: Tier; label: string }[] = [
  { tier: "GOLD", label: "GOLD" },
  { tier: "SILVER", label: "SILVER" },
  { tier: "BRONZE", label: "BRONZE" },
  { tier: "ROOKIE", label: "ROOKIE" },
]

// Pixel art, one character per pixel: G = metal, D = shade, W = shine, R = ribbon.
const CUP = [
  "..GGGGGGGG..",
  "DDGWGGGGGGDD",
  "D.GWGGGGGG.D",
  "D.GWGGGGGG.D",
  ".DGGGGGGGGD.",
  "...GGGGGG...",
  "....GGGG....",
  ".....GG.....",
  ".....GG.....",
  "...GGGGGG...",
  "..DDDDDDDD..",
]
const MEDAL = [
  "..RR....RR..",
  "...RR..RR...",
  "....RRRR....",
  "....GGGG....",
  "...GGGGGG...",
  "..GGWGGGGG..",
  "..GWGGGGGG..",
  "..GGGGGGGG..",
  "...GGGGGG...",
  "....GGGG....",
]

// Theme variables where possible, so the Vice City easter egg recolours gold too.
const METAL: Record<Tier, { G: string; D: string; size: string }> = {
  GOLD: { G: "var(--color-yellow-400)", D: "var(--color-orange-500)", size: "w-20" },
  SILVER: { G: "#d4d4d8", D: "#71717a", size: "w-16" },
  BRONZE: { G: "#d97745", D: "#7c3a16", size: "w-14" },
  ROOKIE: { G: "var(--color-yellow-400)", D: "var(--color-orange-500)", size: "w-11" },
}

function Trophy({ tier }: { tier: Tier }) {
  const pixels = tier === "ROOKIE" ? MEDAL : CUP
  const colors: Record<string, string> = {
    G: METAL[tier].G,
    D: METAL[tier].D,
    W: "#ffffff",
    R: "var(--color-orange-500)",
  }
  return (
    <svg
      viewBox={`0 0 ${pixels[0].length} ${pixels.length}`}
      className={`${METAL[tier].size} h-auto`}
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {pixels.flatMap((row, y) =>
        row.split("").map((c, x) =>
          colors[c] ? <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} style={{ fill: colors[c] }} /> : null,
        ),
      )}
    </svg>
  )
}

// On phones the side columns are narrow, so the island hugs the outer edge
// instead of centring (which would push it off-screen).
const ISLAND_ALIGN = [
  "left-0 md:left-1/2 md:-translate-x-1/2",
  "left-1/2 -translate-x-1/2",
  "right-0 md:right-auto md:left-1/2 md:-translate-x-1/2",
]

function TrophyItem({
  project,
  index,
  col,
  seen,
  reduced,
}: {
  project: Project
  index: number
  col: number
  seen: boolean
  reduced: boolean
}) {
  const inProgress = project.status === "IN PROGRESS"
  const drop: CSSProperties = reduced ? {} : { animationDelay: `${index * 140}ms` }
  const popoverId = useId()
  const itemRef = useRef<HTMLElement>(null)
  // Hover opens the details on desktop; tapping toggles them on touch screens.
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const close = (e: PointerEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !itemRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("pointerdown", close)
    document.addEventListener("keydown", close)
    return () => {
      document.removeEventListener("pointerdown", close)
      document.removeEventListener("keydown", close)
    }
  }, [open])

  return (
    <article
      ref={itemRef}
      className={`group relative flex flex-col items-center hover:z-30 focus-within:z-30 ${open ? "z-30" : ""} ${seen ? (reduced ? "" : "animate-trophy-drop") : "opacity-0"
        }`}
      style={drop}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-describedby={popoverId}
        className="flex flex-col items-center w-full cursor-pointer focus:outline-none"
      >
        {/* Cup */}
        <span className="relative transition-transform duration-300 group-hover:-translate-y-2 group-hover:-rotate-6">
          <span className={`block ${inProgress ? "animate-pulse" : ""}`}>
            <Trophy tier={project.tier} />
          </span>
          {project.tier === "GOLD" && (
            <>
              <span aria-hidden="true" className="absolute -top-1 -right-3 text-yellow-400 text-sm animate-twinkle">✦</span>
              <span aria-hidden="true" className="absolute top-1/3 -left-4 text-yellow-400 text-xs animate-twinkle [animation-delay:700ms]">✦</span>
            </>
          )}
        </span>

        {/* Nameplate */}
        <span className="w-full max-w-[15rem] -mt-px flex flex-wrap items-center justify-center gap-1 md:gap-2 bg-black border-4 border-orange-500 px-1.5 md:px-3 py-2 group-hover:border-orange-400 transition-colors">
          <span className="font-arcade text-[7px] sm:text-[9px] md:text-[10px] leading-relaxed text-yellow-400 text-center break-words">{project.title}</span>
          {inProgress && (
            <span className="shrink-0 px-1 py-0.5 font-arcade text-[7px] text-black bg-orange-500 border border-black">WIP</span>
          )}
        </span>
      </button>

      {/* Details island below the trophy. The top padding bridges the gap so the cursor can reach the link. */}
      <div
        id={popoverId}
        role="tooltip"
        className={`absolute top-full w-72 max-w-[85vw] pt-4 transition-all duration-200 ease-out ${ISLAND_ALIGN[col]} ${open
            ? "visible opacity-100 translate-y-0"
            : "invisible opacity-0 -translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-0"
          }`}
      >
        <div className="bg-black border-4 border-yellow-400 p-4 text-left shadow-[0_0_24px_color-mix(in_oklab,var(--color-yellow-400)_30%,transparent)]">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-arcade text-[8px] text-black bg-yellow-400 px-1.5 py-1 border border-orange-500">{project.tier}</span>
            <span className="font-arcade text-[8px] text-orange-500">{project.status}</span>
          </div>
          <p className="text-white/85 text-sm leading-relaxed mb-3">{project.description}</p>
          <div className="flex flex-wrap gap-1 mb-4">
            {project.tech.map((tech) => (
              <span key={tech} className="px-1.5 py-0.5 text-[11px] font-bold text-black bg-yellow-400 border border-orange-500">
                {tech}
              </span>
            ))}
          </div>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block py-2 text-center font-arcade text-[9px] tracking-wider text-black bg-orange-500 hover:bg-orange-600 border-2 border-black"
          >
            ▶ VIEW PROJECT
          </a>
        </div>
      </div>
      {/* Pointer up to the trophy, centred on it whichever way the island is aligned */}
      <span
        aria-hidden="true"
        className={`absolute top-full mt-2.5 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-black border-l-4 border-t-4 border-yellow-400 transition-opacity duration-200 ${open ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
          }`}
      />
    </article>
  )
}

function Shelf({ tier, label }: { tier: Tier; label: string }) {
  const { ref, seen, reduced } = useSeenOnce<HTMLDivElement>(0.2)
  const items = projects.filter((p) => p.tier === tier)
  if (items.length === 0) return null

  return (
    <div ref={ref}>
      <div
        className="grid grid-cols-3 gap-3 md:gap-10 items-end px-1 md:px-6"
      >
        {items.map((p, i) => {
          // A lone trophy sits in the middle of the shelf.
          const col = items.length === 1 ? 1 : i % 3
          return (
            <div key={p.title} className={items.length === 1 ? "col-start-2" : ""}>
              <TrophyItem project={p} index={i} col={col} seen={seen} reduced={reduced} />
            </div>
          )
        })}
      </div>

      {/* Plank */}
      <div className="relative mt-0 h-4 bg-orange-500 border-y-2 border-black">
        <span className="absolute left-3 top-full mt-1 px-2 py-1 font-arcade text-[8px] text-black bg-yellow-400 border-2 border-black">
          {label}
        </span>
      </div>
      <div className="h-3 bg-gradient-to-b from-black/80 to-transparent" aria-hidden="true" />
    </div>
  )
}

export function ProjectsSection() {
  return (
    <section className="no-pixel py-24 px-4 bg-black">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <div className="text-orange-500 text-sm font-bold tracking-wider mb-2 eyebrow">&gt; ACHIEVEMENTS UNLOCKED...</div>
          <h2 className="pixel-title text-3xl md:text-4xl font-bold text-white mb-4">TROPHY CASE</h2>
        </div>

        {/* Shelves */}
        <div className="pt-8 pb-10 space-y-12">
          {SHELVES.map((s) => (
            <Shelf key={s.tier} tier={s.tier} label={s.label} />
          ))}
        </div>
      </div>
    </section>
  )
}
