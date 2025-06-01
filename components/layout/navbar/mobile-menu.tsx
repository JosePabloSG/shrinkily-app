import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface MobileMenuProps {
  navItems: { name: string; href: string }[]
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
  AuthButton: React.FC
  LanguageSwitch: React.FC
  activeSection?: string
}

export function MobileMenu({ navItems, mobileMenuOpen, setMobileMenuOpen, AuthButton, LanguageSwitch, activeSection }: MobileMenuProps) {
  const pathname = usePathname()

  const isActive = (item: { name: string; href: string }) => {
    if (pathname === "/" && activeSection) {
      // Si estamos en la landing page, usar la sección activa
      return item.href === `#${activeSection}`
    }
    // En otras páginas, usar el pathname tradicional
    return pathname === item.href
  }

  const getContainerStyles = () => {
    const isDocsSection = activeSection === 'docs'

    if (isDocsSection) {
      return "relative bg-dull-lavender-500/30 backdrop-blur-2xl rounded-2xl border border-dull-lavender-300/50 shadow-2xl shadow-dull-lavender-500/20 overflow-hidden mx-4"
    }
    return "relative bg-white/20 backdrop-blur-2xl rounded-2xl border border-white/30 shadow-2xl shadow-blue-violet-500/10 overflow-hidden mx-4"
  }

  const getGlassEffectStyles = () => {
    const isDocsSection = activeSection === 'docs'

    if (isDocsSection) {
      return "absolute inset-0 rounded-2xl bg-gradient-to-b from-dull-lavender-200/20 via-transparent to-dull-lavender-200/20"
    }
    return "absolute inset-0 rounded-2xl bg-gradient-to-b from-white/10 via-transparent to-white/10"
  }

  const getCrystalHighlightStyles = () => {
    const isDocsSection = activeSection === 'docs'

    if (isDocsSection) {
      return "absolute inset-x-0 top-0 h-px rounded-2xl bg-gradient-to-r from-transparent via-dull-lavender-200/60 to-transparent"
    }
    return "absolute inset-x-0 top-0 h-px rounded-2xl bg-gradient-to-r from-transparent via-white/40 to-transparent"
  }

  const getItemStyles = (item: { name: string; href: string }) => {
    const isItemActive = isActive(item)
    const isDocsSection = activeSection === 'docs'

    if (isDocsSection) {
      return cn(
        "block px-4 py-3 rounded-2xl text-base font-medium transition-all duration-500 backdrop-blur-sm",
        isItemActive
          ? "text-dull-lavender-800 bg-dull-lavender-200/40 shadow-sm"
          : "text-dull-lavender-700 hover:text-dull-lavender-800 hover:bg-dull-lavender-100/30"
      )
    } else {
      return cn(
        "block px-4 py-3 rounded-2xl text-base font-medium text-gravel-700 hover:text-blue-violet-600 hover:bg-white/30 transition-all duration-200 backdrop-blur-sm",
        isItemActive && "text-blue-violet-600 bg-white/30 shadow-sm",
      )
    }
  }

  return (
    <div className={cn("md:hidden absolute top-full left-0 right-0 mt-3 z-40 transition-all duration-500", mobileMenuOpen ? "block" : "hidden")}>
      <div className={getContainerStyles()}>
        {/* Glass effect overlay with subtle gradient */}
        <div className={getGlassEffectStyles()}></div>

        {/* Subtle crystal highlight */}
        <div className={getCrystalHighlightStyles()}></div>

        {/* Content */}
        <div className="relative px-6 py-8 space-y-3">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={getItemStyles(item)}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="mt-8 flex flex-col gap-4 px-4">
            <div className="flex justify-center">
              <LanguageSwitch />
            </div>
            <AuthButton />
          </div>
        </div>
      </div>
    </div>
  )
}

