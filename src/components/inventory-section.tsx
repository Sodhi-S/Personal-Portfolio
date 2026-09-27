"use client"

import { useRef, useState, type KeyboardEvent } from "react"
import { TABS, items, usedIn, type Item, type Tab } from "@/data/inventory"
import { useSeenOnce } from "@/hooks/use-seen-once"

// Slots per tab page; leftover slots render empty, like an unfilled bag.
const SLOTS = 12

function ItemIcon({ item, className }: { item: Item; className: string }) {
  if (item.icon) {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <path d={item.icon.path} fill="currentColor" />
      </svg>
    )
  }
  return (
    <span className={`${className} flex items-center justify-center font-arcade text-[10px] md:text-xs leading-none`} aria-hidden="true">
      {item.short}
    </span>
  )
}

export function InventorySection() {
  const { ref, seen, reduced } = useSeenOnce<HTMLDivElement>(0.25)
  const [tab, setTab] = useState<Tab>(TABS[0])
  const [selected, setSelected] = useState(0)
  const gridRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const bag = items.filter((i) => i.tab === tab)
  const item = bag[Math.min(selected, bag.length - 1)]
  const quests = usedIn(item)

  const openTab = (next: Tab) => {
    setTab(next)
    setSelected(0)
  }

  const onTabKey = (e: KeyboardEvent, i: number) => {
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0
    if (!step) return
    e.preventDefault()
    const next = (i + step + TABS.length) % TABS.length
    openTab(TABS[next])
    tabRefs.current[next]?.focus()
  }

  // Arrow keys move the cursor around the grid, whatever its column count.
  const onSlotKey = (e: KeyboardEvent, i: number) => {
    const grid = gridRef.current
    if (!grid) return
    const cols = getComputedStyle(grid).gridTemplateColumns.split(" ").length
    const step = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: cols, ArrowUp: -cols }[e.key]
    if (step === undefined) return
    e.preventDefault()
    const next = i + step
    if (next < 0 || next >= bag.length) return
    setSelected(next)
    grid.querySelectorAll<HTMLButtonElement>("[data-slot]")[next]?.focus()
  }

  return (
    <section className="no-pixel py-24 px-4 bg-black">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <div className="text-yellow-400 text-sm font-bold tracking-wider mb-2">&gt; OPENING INVENTORY...</div>
          <h2 className="pixel-title text-3xl md:text-4xl font-bold text-white mb-4">INVENTORY</h2>
          <p className="text-white max-w-2xl mx-auto">Items collected along the way</p>
        </div>

        <div ref={ref} className="border-4 border-orange-500 bg-black p-4 md:p-8">
          {/* Tabs */}
          <div role="tablist" aria-label="Item categories" className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {TABS.map((t, i) => {
              const active = t === tab
              return (
                <button
                  key={t}
                  ref={(el) => {
                    tabRefs.current[i] = el
                  }}
                  type="button"
                  role="tab"
                  id={`inv-tab-${i}`}
                  aria-selected={active}
                  aria-controls="inv-panel"
                  tabIndex={active ? 0 : -1}
                  onClick={() => openTab(t)}
                  onKeyDown={(e) => onTabKey(e, i)}
                  className={`py-3 font-arcade text-[9px] md:text-xs tracking-wider border-2 cursor-pointer transition-colors ${
                    active
                      ? "bg-yellow-400 text-black border-yellow-400"
                      : "text-yellow-400 border-orange-500 hover:border-yellow-400"
                  }`}
                >
                  {active ? "▶ " : ""}
                  {t}
                </button>
              )
            })}
          </div>

          <div
            id="inv-panel"
            role="tabpanel"
            aria-labelledby={`inv-tab-${TABS.indexOf(tab)}`}
            className="grid md:grid-cols-[1fr_20rem] gap-5 md:gap-8"
          >
            {/* Slots. Keyed on the tab so the pop-in replays when you switch pages. */}
            <div key={tab} ref={gridRef} className="grid grid-cols-4 sm:grid-cols-6 gap-3 md:gap-4 content-start">
              {Array.from({ length: SLOTS }, (_, i) => {
                const it = bag[i]
                const pop = seen
                  ? reduced
                    ? ""
                    : "animate-item-pop"
                  : "opacity-0"
                const delay = reduced ? undefined : { animationDelay: `${i * 45}ms` }

                if (!it) {
                  return (
                    <div
                      key={i}
                      aria-hidden="true"
                      className={`aspect-square border-2 border-dashed border-orange-500/40 ${pop}`}
                      style={delay}
                    />
                  )
                }

                const active = i === selected
                return (
                  <button
                    key={it.name}
                    type="button"
                    data-slot
                    tabIndex={active ? 0 : -1}
                    aria-pressed={active}
                    aria-label={it.name}
                    onClick={() => setSelected(i)}
                    onMouseEnter={() => setSelected(i)}
                    onFocus={() => setSelected(i)}
                    onKeyDown={(e) => onSlotKey(e, i)}
                    className={`relative aspect-square flex items-center justify-center border-2 cursor-pointer transition-colors focus:outline-none ${
                      active
                        ? "bg-yellow-400 text-black border-yellow-400"
                        : "bg-black text-yellow-400 border-orange-500 hover:border-yellow-400"
                    } ${pop}`}
                    style={delay}
                  >
                    <ItemIcon item={it} className="w-3/5 h-3/5" />
                    {/* Blinking corner cursor around the selected slot */}
                    {active && (
                      <span aria-hidden="true" className="inv-cursor pointer-events-none absolute -inset-2 animate-blink" />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Item card */}
            <div aria-live="polite" className="border-4 border-yellow-400 p-6 flex flex-col items-center text-center min-h-[20rem]">
              <div className="font-arcade text-[10px] text-orange-500 mb-4">{tab}</div>
              <div key={`${tab}-${item.name}`} className={reduced ? "" : "animate-item-get"}>
                <ItemIcon item={item} className="w-24 h-24 text-yellow-400 [&.font-arcade]:text-2xl" />
              </div>
              <div className="mt-5 font-arcade text-sm leading-relaxed text-white">{item.name}</div>

              {quests.length > 0 && (
                <div className="mt-5 w-full text-left">
                  <div className="font-arcade text-[9px] text-orange-500 mb-3">
                    USED IN {quests.length} {quests.length === 1 ? "QUEST" : "QUESTS"}
                  </div>
                  <ul className="space-y-1.5">
                    {quests.map((q) => (
                      <li key={q} className="text-sm leading-snug text-white/85">
                        <span className="text-yellow-400">▸</span> {q}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 text-center font-arcade text-[8px] md:text-[9px] text-white/50 tracking-wider">
            ◀ ▶ SWITCH PAGE · HOVER OR TAP AN ITEM
          </div>
        </div>
      </div>
    </section>
  )
}
