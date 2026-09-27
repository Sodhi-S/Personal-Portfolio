"use client"
import { useEffect, useState } from "react"
import { ViceCityToggle } from "@/components/vice-city"

const navItems = [
  { id: "home", label: "HOME", icon: "🏠" },
  { id: "about", label: "ABOUT", icon: "👻" },
  { id: "experience", label: "EXPERIENCE", icon: "🏁" },
  { id: "projects", label: "PROJECTS", icon: "🎮" },
  { id: "skills", label: "SKILLS", icon: "⚡" },
  { id: "contact", label: "CONTACT", icon: "📡" },
]

export function Header() {
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    navItems.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
        },
        { rootMargin: "-40% 0px -55% 0px" }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b-4 border-yellow-400">
        <div className="px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button onClick={() => scrollTo("home")} className="flex items-center space-x-2 cursor-pointer">
              <div className="w-8 h-8 bg-yellow-400 border-2 border-orange-500 flex items-center justify-center text-black font-bold text-sm">
                SS
              </div>
              <span className="hidden sm:inline text-white font-arcade font-bold text-xs lg:text-sm tracking-wider">SAHEJ SODHI</span>
            </button>

            {/* Top-bar nav until the floating island has room (2xl) */}
            <nav className="flex 2xl:hidden items-center gap-1 xl:gap-2 overflow-x-auto">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  aria-label={item.label}
                  aria-current={activeSection === item.id ? "true" : undefined}
                  className={`flex items-center gap-2 px-2 py-1 xl:px-3 xl:py-2 font-arcade text-[10px] font-bold tracking-wider whitespace-nowrap border-2 cursor-pointer transition-all duration-200 ${activeSection === item.id
                      ? "bg-yellow-400 text-black border-orange-500"
                      : "text-white border-transparent hover:bg-orange-500 hover:border-yellow-400"
                    }`}
                >
                  <span className="text-base xl:text-sm">{item.icon}</span>
                  <span className="hidden xl:inline">{item.label}</span>
                </button>
              ))}
            </nav>

            {/* Score Display */}
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center space-x-4 font-arcade text-[10px] font-bold">
                <div className="hidden 2xl:block text-yellow-400">COINS: 999</div>
                <div className="text-orange-500 whitespace-nowrap">WORLD: 1-1</div>
              </div>
              <ViceCityToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Floating island section selector (2xl+) */}
      <nav
        aria-label="Sections"
        className="hidden 2xl:flex fixed left-5 top-1/2 -translate-y-1/2 z-40 flex-col gap-1.5 p-2 bg-black/90 backdrop-blur-sm border-4 border-yellow-400 shadow-[0_0_24px_color-mix(in_oklab,var(--color-yellow-400)_25%,transparent)] animate-island-in"
      >
        {navItems.map((item) => {
          const active = activeSection === item.id
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              aria-current={active ? "true" : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 font-arcade text-[9px] font-bold tracking-wider whitespace-nowrap border-2 cursor-pointer transition-all duration-200 ${active
                  ? "bg-yellow-400 text-black border-orange-500"
                  : "text-white border-transparent hover:bg-orange-500 hover:text-black hover:border-yellow-400 hover:translate-x-1"
                }`}
            >
              <span className="text-base leading-none" aria-hidden="true">{item.icon}</span>
              {item.label}
            </button>
          )
        })}
      </nav>
    </>
  )
}
