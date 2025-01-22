"use client"

import { Menu, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { DesktopMenu } from "./desktop-menu"
import { MobileMenu } from "./mobile-menu"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

const navItems = [
  { name: "Home", href: "/" },
  { name: "Features", href: "/features" },
  { name: "Docs", href: "/docs" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { data: session, status } = useSession()
  const user = session?.user

  const AuthButton = () => {
    if (status === "loading") {
      return <Skeleton className="w-24 h-9" />
    }

    if (user) {
      return (
        <Link href="/dashboard/urls">
          <Button size="sm" variant={"primary"}>
            Go to Dashboard
          </Button>
        </Link>
      )
    }

    return (
      <Link href="/auth/signin">
        <Button size="sm" variant={"primary"}>
          Sign In
        </Button>
      </Link>
    )
  }

  return (
    <nav className="sticky top-0 z-50 bg-dull-lavender-50 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-violet-500">
              Shrinkily
            </Link>
          </div>

          {/* Desktop menu */}
          <DesktopMenu navItems={navItems} AuthButton={AuthButton} />

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="text-gravel-700 hover:text-blue-violet-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <MobileMenu
        navItems={navItems}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        AuthButton={AuthButton}
      />
    </nav>
  )
}

