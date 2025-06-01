"use client"

import { Menu, X, Globe } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { DesktopMenu } from "./desktop-menu"
import { MobileMenu } from "./mobile-menu"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useTranslations } from "next-intl"
import { usePathname, useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLocale } from 'next-intl'
import { SUPPORTED_LOCALES } from '@/config/routing.config'

const getNavItems = (t: any, pathname: string) => [
  { name: t('home'), href: pathname === "/" ? "#home" : "/#home" },
  { name: t('features'), href: pathname === "/" ? "#features" : "/#features" },
  { name: t('docs'), href: pathname === "/" ? "#docs" : "/#docs" },
  { name: t('about'), href: pathname === "/" ? "#about" : "/#about" },
  { name: t('contact'), href: pathname === "/" ? "#contact" : "/#contact" },
]

export function Navbar() {
  const t = useTranslations('layout.navbar')
  const locale = useLocale()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const { data: session, status } = useSession()
  const pathname = usePathname()
  const user = session?.user

  // Detectar sección activa
  useEffect(() => {
    if (pathname !== '/') return

    const handleScroll = () => {
      const sections = ['home', 'features', 'docs', 'about', 'contact']
      const scrollY = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollY >= offsetTop && scrollY < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Llamada inicial
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  const handleLanguageChange = (newLocale: string) => {
    const currentPathSegments = pathname.split('/')
    // Remove locale and reassemble path
    currentPathSegments.splice(1, 1, newLocale)
    const newPath = currentPathSegments.join('/')
    router.push(newPath)
    router.refresh()
  }

  const LanguageSwitch = () => {
    const names = {
      en: t('language.en'),
      es: t('language.es')
    }
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="sm"
            variant="ghost"
            className={`rounded-2xl px-3 flex items-center space-x-2 ${activeSection === 'docs' ? 'text-dull-lavender-800 hover:text-dull-lavender-900' : 'text-blue-violet-700 hover:text-blue-violet-800'
              } hover:bg-blue-violet-50/50`}
            aria-label={t('language.switchLanguage')}
          >
            <Globe className="w-4 h-4" aria-hidden="true" />
            <span className="font-medium">{names[locale as keyof typeof names]}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32 bg-white/95 backdrop-blur-sm border border-blue-violet-100">
          {SUPPORTED_LOCALES.map((lang) => (
            <DropdownMenuItem
              key={lang}
              onClick={() => handleLanguageChange(lang)}
              className={`flex items-center space-x-2 ${lang === locale ? 'bg-blue-violet-50 text-blue-violet-700' : 'text-gravel-700 hover:text-blue-violet-700'
                }`}
            >
              <Globe className={`w-4 h-4 ${lang === locale ? 'text-blue-violet-600' : 'text-gravel-500'}`} />
              <span>{names[lang as keyof typeof names]}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  const AuthButton = () => {
    if (status === "loading") {
      return <Skeleton className="w-24 h-9" />
    }

    if (user) {
      return (
        <Link href="/dashboard/urls">
          <Button size="sm" variant={"primary"} className="rounded-2xl w-full sm:w-auto">
            {t('goDashboard')}
          </Button>
        </Link>
      )
    }

    return (
      <Link href="/auth/signin">
        <Button size="sm" variant={"primary"} className="rounded-2xl w-full sm:w-auto">
          {t('signIn')}
        </Button>
      </Link>
    )
  }

  const navItems = getNavItems(t, pathname)

  return (
    <div className="sticky top-0 z-50 w-full px-4 sm:px-6 lg:px-8 pt-4">
      {/* Glassmorphism Container */}
      <div className="max-w-5xl mx-auto relative">
        <div className={`relative backdrop-blur-2xl rounded-2xl border shadow-2xl transition-all duration-500 ${activeSection === 'docs'
          ? 'bg-dull-lavender-500/30 border-dull-lavender-300/50 shadow-dull-lavender-500/20'
          : 'bg-white/20 border-white/30 shadow-blue-violet-500/10'
          }`}>
          {/* Glass effect overlay with subtle gradient */}
          <div className={`absolute inset-0 rounded-2xl transition-all duration-500 ${activeSection === 'docs'
            ? 'bg-gradient-to-r from-dull-lavender-200/20 via-transparent to-dull-lavender-200/20'
            : 'bg-gradient-to-r from-white/10 via-transparent to-white/10'
            }`}></div>

          {/* Subtle crystal highlight */}
          <div className={`absolute inset-x-0 top-0 h-px rounded-2xl transition-all duration-500 ${activeSection === 'docs'
            ? 'bg-gradient-to-r from-transparent via-dull-lavender-200/60 to-transparent'
            : 'bg-gradient-to-r from-transparent via-white/40 to-transparent'
            }`}></div>

          {/* Inner content */}
          <div className="relative px-6 py-4">
            <div className="flex justify-between items-center">
              {/* Logo */}
              <div className="flex-shrink-0 flex items-center">
                <Link href="/" className={`text-2xl font-bold drop-shadow-sm transition-colors duration-500 ${activeSection === 'docs'
                  ? 'text-dull-lavender-800'
                  : 'text-blue-violet-700'
                  }`}>
                  Shrinkily
                </Link>
              </div>

              {/* Desktop menu */}
              <DesktopMenu navItems={navItems} AuthButton={AuthButton} LanguageSwitch={LanguageSwitch} activeSection={activeSection} />

              {/* Mobile menu button */}
              <div className="md:hidden flex items-center">
                <button
                  type="button"
                  className="text-gravel-700 hover:text-blue-violet-600 p-2 rounded-2xl hover:bg-white/20 transition-all duration-200 backdrop-blur-sm"
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
          LanguageSwitch={LanguageSwitch}
          activeSection={activeSection}
        />
      </div>
    </div>
  )
}