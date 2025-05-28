import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface DesktopMenuProps {
  navItems: { name: string; href: string }[]
  AuthButton: React.FC
}

export function DesktopMenu({ navItems, AuthButton }: DesktopMenuProps) {
  const pathname = usePathname()

  return (
    <div className="hidden md:flex items-center space-x-2">
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={cn(
            "text-gravel-700 hover:text-blue-violet-600 hover:bg-white/30 px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-200 backdrop-blur-sm hover:shadow-sm",
            pathname === item.href && "text-blue-violet-600 bg-white/30 shadow-sm",
          )}
        >
          {item.name}
        </Link>
      ))}
      <div className="ml-4">
        <AuthButton />
      </div>
    </div>
  )
}

