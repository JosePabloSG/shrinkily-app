"use client";

import { LinkIcon, Settings, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { User } from "./user";
import { SignOut } from "./signout";

const navItems = [
  { icon: LinkIcon, label: "URL Management", href: "/dashboard/urls" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Move button inside aside to prevent overlap */}
      <aside className={`fixed left-0 top-0 z-40 border  h-screen w-64 transform transition-transform duration-300 ease-in-out bg-blue-violet-50 ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
        <button
          className="absolute -right-12 top-4 md:hidden bg-blue-violet-500 text-white p-2 rounded-md"
          onClick={toggleSidebar}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="h-full flex flex-col">
          <User />
          <nav className="flex-1 px-3 py-4 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
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

      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-gravel-900 bg-opacity-50 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;

