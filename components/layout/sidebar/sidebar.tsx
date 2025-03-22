"use client";

import { LinkIcon, Settings } from 'lucide-react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { User } from "./user";
import { SignOut } from "./signout";
import MobileSidebar from "./mobile-sidebar";
import MobileNavbar from "./mobile-navbar";
import { useTranslations } from 'next-intl';


const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = useTranslations('layout.sidebar');
  const pathname = usePathname();

  const navItems = [
    { icon: LinkIcon, label: t('navItems.urlManagement'), href: "/dashboard/urls" },
    { icon: Settings, label: t('navItems.settings'), href: "/dashboard/settings" },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 z-40 hidden md:block h-screen w-64 bg-blue-violet-50 border-r border-blue-violet-200">
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
          <div className="hidden px-3 py-4 border-t border-blue-violet-200 sm:block">
            <SignOut />
          </div>
        </div>
      </aside>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <MobileNavbar onMenuClick={() => setIsMobileMenuOpen(true)} />
        <MobileSidebar
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          navItems={navItems}
        />
      </div>
    </>
  );
};

export default Sidebar;

