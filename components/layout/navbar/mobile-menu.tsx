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
    <div className={cn("md:hidden", mobileMenuOpen ? "block" : "hidden")}>
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-dull-lavender-50">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "block px-3 py-2 rounded-md text-base font-medium text-gravel-700 hover:text-blue-violet-600 hover:bg-water-leaf-100 transition-colors",
              pathname === item.href && "text-blue-violet-600 bg-water-leaf-100",
            )}
            onClick={() => setMobileMenuOpen(false)}
          >
            {item.name}
          </Link>
        ))}
        <div className="mt-4 px-3">
          <AuthButton />
        </div>
      </div>
    </div>
  )
}

