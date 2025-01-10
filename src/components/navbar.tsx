"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, X, Podcast } from "lucide-react"

import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"

const Navbar = () => {
  const pathname = usePathname()
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchRef.current &&
      !searchRef.current.contains(event.target as Node)
    ) {
      setIsSearchExpanded(false)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearchExpand = () => {
    setIsSearchExpanded(true)
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsSearchExpanded(false)
    }
  }

  const navLinks = [
    { href: "/channel", label: "Channel" },
    { href: "/stats", label: "Stats" },
    { href: "/profile", label: "Profile" }
  ]

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link
              href="/"
              className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors"
            >
              <Podcast className="h-6 w-6" />
              <span className="text-lg font-semibold">PodcastARR</span>
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === link.href
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <div ref={searchRef} className="relative">
              {isSearchExpanded ? (
                <div className="flex items-center">
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search episodes..."
                    className="w-64 px-4 py-2 rounded-md border bg-background"
                    onKeyDown={handleKeyDown}
                  />
                  <button
                    onClick={() => setIsSearchExpanded(false)}
                    className="ml-2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleSearchExpand}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Search className="h-5 w-5" />
                </button>
              )}
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
