"use client";

import { LinkIcon, Settings, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { User } from "./user";
import { SignOut } from "./signout";
import { useSession } from "next-auth/react";
import Image from "next/image";

const navItems = [
  { icon: LinkIcon, label: "URL Management", href: "/dashboard/urls" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <>
      {/* Mobile Header - Fixed at top */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-blue-violet-50 border-b border-blue-violet-200 flex items-center justify-between px-4 md:hidden z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-blue-violet-100 rounded-md"
        >
          <Menu size={24} className="text-blue-violet-900" />
        </button>

        <h1 className="text-xl font-bold text-blue-violet-900">
          QuickShrink
        </h1>

        <div className="w-10 h-10 rounded-full bg-blue-violet-200 flex items-center justify-center overflow-hidden">
          <Image
            src={session?.user?.image || "/placeholder.svg"}
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
      </div>

      {/* Sidebar Navigation - Full screen on mobile when open */}
      <aside className={`
        fixed md:static
        md:block
        bg-blue-violet-50
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        transition-transform duration-300
        w-full md:w-64
        h-screen
        z-30
        top-16 md:top-0
      `}>
        <div className="h-full flex flex-col">
          <div className="hidden md:block">
            <User />
          </div>
          <nav className="flex-1 px-3 py-4 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-150 ease-in-out ${isActive
                      ? "bg-blue-violet-100 text-blue-violet-900"
                      : "text-gravel-600 hover:bg-blue-violet-100 hover:text-blue-violet-900"
                    }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="px-3 py-4 border-t border-blue-violet-200">
            <SignOut />
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gravel-900/50 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;