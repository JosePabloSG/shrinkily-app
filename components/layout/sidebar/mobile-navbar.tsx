"use client"

import type React from "react"
import { useState } from "react"
import { Menu, Settings, LogOut } from "lucide-react"
import { useSession, signOut } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"

const MobileNavbar: React.FC<{ onMenuClick: () => void }> = ({ onMenuClick }) => {
  const { data: session } = useSession()
  const user = session?.user
  const [isOpen, setIsOpen] = useState(false)
  const t = useTranslations('popover-content-mobile')

  const handleSignOut = () => {
    signOut()
  }

  return (
    <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-blue-violet-200 md:hidden z-50">
      <div className="flex items-center justify-between h-full px-4">
        <button
          onClick={onMenuClick}
          className="p-2 hover:bg-blue-violet-50 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          <Menu className="h-6 w-6 text-blue-violet-600" />
        </button>

        <h1 className="text-xl font-semibold text-blue-violet-900">Shrinkily</h1>

        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <button className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-violet-100 focus:outline-none focus:ring-2 focus:ring-blue-violet-300">
              <Image
                src={user?.image || "/placeholder.svg"}
                alt="Profile"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-2">
            <div className="flex flex-col space-y-2">
              <Link href="/dashboard/settings" passHref>
                <Button variant="ghost" className="w-full justify-start" onClick={() => setIsOpen(false)}>
                  <Settings className="mr-2 h-4 w-4" />
                  {t("settings")}
                </Button>
              </Link>
              <Button
                variant="ghost"
                className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={handleSignOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                {t("Signout")}
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

export default MobileNavbar

