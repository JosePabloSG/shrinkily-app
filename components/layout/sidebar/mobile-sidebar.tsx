"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from 'lucide-react';
import { SignOut } from "./signout";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: Array<{ icon: React.ElementType; label: string; href: string }>;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({ isOpen, onClose, navItems }) => {
  const pathname = usePathname();

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-blue-violet-50 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
          } md:hidden`}
      >
        <div className="h-full flex flex-col">
          <div className="flex justify-between p-4">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-blue-violet-500">
                QuickShrink
              </Link>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-blue-violet-100 rounded-lg transition-colors"
              aria-label="Close menu"
            >
              <X className="h-6 w-6 text-blue-violet-600" />
            </button>
          </div>
          <nav className="flex-1 px-3 py-4 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleLinkClick}
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
          className="fixed inset-0 z-40 bg-gravel-900 bg-opacity-50 md:hidden"
          onClick={onClose}
        />
      )}
    </>
  );
};

export default MobileSidebar;

