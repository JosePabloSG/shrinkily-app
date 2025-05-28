import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface MobileMenuProps {
  navItems: { name: string; href: string }[]
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
  AuthButton: React.FC
}

export function MobileMenu({ navItems, mobileMenuOpen, setMobileMenuOpen, AuthButton }: MobileMenuProps) {
  const pathname = usePathname()

  return (
    <div className={cn("md:hidden absolute top-full left-0 right-0 mt-3 z-40", mobileMenuOpen ? "block" : "hidden")}>
      <div className="relative bg-white/20 backdrop-blur-2xl rounded-full border border-white/30 shadow-2xl shadow-blue-violet-500/10 overflow-hidden mx-4">
        {/* Glass effect overlay with subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/10"></div>

        {/* Subtle crystal highlight */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>

        {/* Content */}
        <div className="relative px-6 py-8 space-y-3">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "block px-4 py-3 rounded-2xl text-base font-medium text-gravel-700 hover:text-blue-violet-600 hover:bg-white/30 transition-all duration-200 backdrop-blur-sm",
                pathname === item.href && "text-blue-violet-600 bg-white/30 shadow-sm",
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="mt-8 px-4">
            <AuthButton />
          </div>
        </div>
      </div>
    </div>
  )
}

