"use client";

import React from "react";
import { Menu } from 'lucide-react';
import { useSession } from "next-auth/react";
import Image from "next/image";

const MobileNavbar: React.FC<{ onMenuClick: () => void }> = ({ onMenuClick }) => {
  const { data: session } = useSession();
  const user = session?.user;

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
        
        <h1 className="text-xl font-semibold text-blue-violet-900">
          QuickShrink
        </h1>

        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-violet-100">
          <Image
            src={user?.image || "/placeholder.svg"}
            alt="Profile"
            width={40}
            height={40}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default MobileNavbar;

