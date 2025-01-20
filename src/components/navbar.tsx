"use client"

import { useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Podcast, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getProfileImage } from "@/actions/profile"
import { useProfileStore } from "@/store/profile-store"

const Navbar = () => {
  const pathname = usePathname()
  const { profileImage, updateProfile } = useProfileStore()

  const navLinks = [
    { href: "/channel", label: "Channel" },
    { href: "/stats", label: "Stats" },
    { href: "/channel/public", label: "Public Page" }
  ]

  useEffect(() => {
    const initializeProfile = async () => {
      try {
        const profileImage = await getProfileImage()
        updateProfile(profileImage, null)
      } catch (error) {
        console.error("Error fetching profile:", error)
      }
    }

    initializeProfile()
  }, [updateProfile])

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
            <ThemeToggle />

            <Link href="/channelinfo" className="hover:opacity-80">
              <Avatar>
                <AvatarImage src={profileImage || undefined} alt="Profile" />
                <AvatarFallback>
                  <User className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
