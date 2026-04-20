"use client";

import { logout } from "@/lib/auth";
import { LogOut } from "lucide-react";

interface LogoutButtonProps {
  variant?: "icon" | "full";
  className?: string;
}

export default function LogoutButton({
  variant = "icon",
  className = "",
}: LogoutButtonProps) {
  return (
    <form action={logout}>
      <button
        type="submit"
        className={`${
          variant === "full"
            ? "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors w-full"
            : "p-2.5 rounded-xl bg-muted hover:bg-red-50 hover:text-red-600 transition-colors"
        } ${className}`}
        aria-label="Sign out"
      >
        <LogOut className="w-4.5 h-4.5" />
        {variant === "full" && <span>Sign Out</span>}
      </button>
    </form>
  );
}
