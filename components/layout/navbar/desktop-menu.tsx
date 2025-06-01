import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface DesktopMenuProps {
  navItems: { name: string; href: string }[]
  AuthButton: React.FC
  LanguageSwitch: React.FC
  activeSection?: string
}

export function DesktopMenu({ navItems, AuthButton, LanguageSwitch, activeSection }: DesktopMenuProps) {
  const pathname = usePathname()

  const isActive = (item: { name: string; href: string }) => {
    if (pathname === "/" && activeSection) {
      // Si estamos en la landing page, usar la sección activa
      return item.href === `#${activeSection}`
    }
    // En otras páginas, usar el pathname tradicional
    return pathname === item.href
  }

  const getItemStyles = (item: { name: string; href: string }) => {
    const isItemActive = isActive(item)
    const isDocsSection = activeSection === 'docs'

    if (isDocsSection) {
      // Estilos para cuando estamos en la sección docs
      return cn(
        "px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-500 backdrop-blur-sm hover:shadow-sm",
        isItemActive
          ? "text-blue-violet-600 bg-dull-lavender-200/40 shadow-sm"
          : "text-dull-lavender-700 hover:text-blue-violet-600 hover:bg-dull-lavender-100/30"
      )
    } else {
      // Estilos por defecto
      return cn(
        "px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-200 backdrop-blur-sm hover:shadow-sm",
        isItemActive
          ? "text-blue-violet-600 bg-white/30 shadow-sm"
          : "text-gravel-700 hover:text-blue-violet-600 hover:bg-white/30",
      )
    }
  }

  return (
    <div className="hidden md:flex items-center space-x-2">
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={getItemStyles(item)}
        >
          {item.name}
        </Link>
      ))}
      <div className="flex items-center space-x-2 ml-4">
        <LanguageSwitch />
        <AuthButton />
      </div>
    </div>
  )
}

