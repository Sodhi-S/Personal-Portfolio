"use client"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

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
      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b-4 border-yellow-400">
        <div className="px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button onClick={() => scrollTo("home")} className="flex items-center space-x-2 cursor-pointer">
              <div className="w-8 h-8 bg-yellow-400 border-2 border-orange-500 flex items-center justify-center text-black font-bold text-sm">
                SS
              </div>
              <span className="text-white font-arcade font-bold text-xs sm:text-sm tracking-wider">SAHEJ SODHI</span>
            </button>

            {/* Mobile nav (icons) */}
            <nav className="flex md:hidden items-center gap-1 overflow-x-auto">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  aria-label={item.label}
                  className={`px-2 py-1 text-base border-2 transition-all duration-200 ${activeSection === item.id
                      ? "bg-yellow-400 border-orange-500"
                      : "border-transparent hover:border-yellow-400"
                    }`}
                >
                  {item.icon}
                </button>
              ))}
            </nav>

            {/* Score Display */}
            <div className="hidden sm:flex items-center space-x-4 font-arcade text-[10px] font-bold">
              <div className="text-yellow-400">COINS: 999</div>
              <div className="text-orange-500">WORLD: 1-1</div>
            </div>
          </div>
        </div>
      </header>

      {/* Left sidebar (desktop) */}
      <aside className="hidden md:flex fixed left-0 top-16 bottom-0 w-52 z-40 flex-col bg-black/95 backdrop-blur-sm border-r-4 border-yellow-400 p-3 gap-2">
        <div className="text-yellow-400 font-arcade text-[8px] font-bold tracking-[0.2em] text-center mb-2 mt-2">
          SELECT LEVEL
        </div>
        {navItems.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            onClick={() => scrollTo(item.id)}
            className={`w-full justify-start px-3 py-2 font-arcade text-[10px] font-bold tracking-wider transition-all duration-200 border-2 cursor-pointer ${activeSection === item.id
                ? "bg-yellow-400 text-black border-orange-500"
                : "text-white hover:text-white hover:bg-orange-500 border-transparent hover:border-yellow-400"
              }`}
          >
            <span className="mr-3">{item.icon}</span>
            {item.label}
          </Button>
        ))}
      </aside>
    </>
  )
}
