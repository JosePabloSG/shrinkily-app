import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DesktopMenuProps {
  navItems: { name: string; href: string }[];
}

export function DesktopMenu({ navItems }: DesktopMenuProps) {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex items-center space-x-4">
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={cn(
            "text-gravel-700 hover:text-blue-violet-600 hover:bg-water-leaf-100 px-3 py-2 rounded-md text-sm font-medium transition-colors",
            pathname === item.href && "text-blue-violet-600 bg-water-leaf-100"
          )}
        >
          {item.name}
        </Link>
      ))}
      <Link href="/auth/signin">
        <Button
          size="sm"
          className="bg-blue-violet-500 hover:bg-blue-violet-600 text-white"
        >
          Sign In
        </Button>
      </Link>
    </div>
  );
}