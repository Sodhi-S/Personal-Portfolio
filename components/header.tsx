"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Header() {
  const pathname = usePathname()

  const navItems = [
    { id: "home", label: "HOME", icon: "🏠", href: "/" },
    { id: "about", label: "ABOUT", icon: "👻", href: "/about"},
    { id: "projects", label: "PROJECTS", icon: "🎮", href: "/projects" },
    { id: "contact", label: "CONTACT", icon: "📡", href: "/contact" },
  ]

  const getActiveSection = () => {
    if (pathname === "/") return "home"
    if (pathname === "/about") return "about"
    if (pathname === "/projects") return "projects"
    if (pathname === "/contact") return "contact"
    return "home"
  }

  const activeSection = getActiveSection()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b-4 border-yellow-400">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-yellow-400 border-2 border-orange-500 flex items-center justify-center text-black font-bold text-sm">
              SS
            </div>
            <span className="text-white font-bold text-lg tracking-wider">SAHEJ SODHI</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link key={item.id} href={item.href}>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`
                    px-4 py-2 text-xs font-bold tracking-wider transition-all duration-200 border-2
                    ${
                      activeSection === item.id
                        ? "bg-yellow-400 text-black border-orange-500"
                        : "text-white hover:text-black hover:bg-orange-500 border-transparent hover:border-yellow-400"
                    }
                  `}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>

          {/* Score Display */}
          <div className="hidden sm:flex items-center space-x-4 text-xs font-bold">
            <div className="text-yellow-400">COINS: 999</div>
            <div className="text-orange-500">WORLD: 1-1</div>
          </div>
        </div>
      </div>
    </header>
  )
}
