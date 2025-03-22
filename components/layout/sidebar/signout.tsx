"use client";

import { handleSignOut } from "@/server/actions/auth";
import { LogOut } from "lucide-react";
import { useTranslations } from "next-intl";

export function SignOut() {
  const t = useTranslations("layout.sidebar");
  return (
    <form action={handleSignOut}>
      <button
        type="submit"
        className="flex w-full items-center px-4 py-2 text-sm font-medium text-gravel-600 hover:bg-blue-violet-100 hover:hover:text-red-500 rounded-md transition-colors duration-150 ease-in-out"
      >
        <LogOut className="h-5 w-5 mr-3" />
        {t("navItems.signOut")}
      </button>
    </form>
  );
}

