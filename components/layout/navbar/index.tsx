"use client"

import { Menu, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { DesktopMenu } from "./desktop-menu"
import { MobileMenu } from "./mobile-menu"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useTranslations } from "next-intl"

const getNavItems = (t: any) => [
  { name: t('home'), href: "/" },
  { name: t('features'), href: "/features" },
  { name: t('docs'), href: "/docs" },
  { name: t('about'), href: "/about" },
  { name: t('contact'), href: "/contact" },
]

export function Navbar() {
  const t = useTranslations('layout.navbar')
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
          <Button size="sm" variant={"primary"} className="rounded-full w-full sm:w-auto">
            {t('goDashboard')}
          </Button>
        </Link>
      )
    }

    return (
      <Link href="/auth/signin">
        <Button size="sm" variant={"primary"} className="rounded-full w-full sm:w-auto">
          {t('signIn')}
        </Button>
      </Link>
    )
  }

  const navItems = getNavItems(t)

  return (
    <div className="sticky top-0 z-50 w-full px-4 sm:px-6 lg:px-8 pt-4">
      {/* Glassmorphism Container */}
      <div className="max-w-5xl mx-auto relative">
        <div className="relative bg-white/20 backdrop-blur-2xl rounded-full border border-white/30 shadow-2xl shadow-blue-violet-500/10">
          {/* Glass effect overlay with subtle gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 rounded-full"></div>

          {/* Subtle crystal highlight */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full"></div>

          {/* Inner content */}
          <div className="relative px-6 py-4">
            <div className="flex justify-between items-center">
              {/* Logo */}
              <div className="flex-shrink-0 flex items-center">
                <Link href="/" className="text-2xl font-bold text-blue-violet-700 drop-shadow-sm">
                  Shrinkily
                </Link>
              </div>

              {/* Desktop menu */}
              <DesktopMenu navItems={navItems} AuthButton={AuthButton} />

              {/* Mobile menu button */}
              <div className="md:hidden flex items-center">
                <button
                  type="button"
                  className="text-gravel-700 hover:text-blue-violet-600 p-2 rounded-xl hover:bg-white/20 transition-all duration-200 backdrop-blur-sm"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  <span className="sr-only">{t('openMainMenu')}</span>
                  {mobileMenuOpen ? (
                    <X className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Menu className="block h-6 w-6" aria-hidden="true" />
                  )}
                </button>
              </div>
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
      </div>
    </div>
  )
}