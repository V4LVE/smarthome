"use client";

import Link from "next/link";
import { UserHeaderComponent } from "./userHeaderComponent";
import { ThemeToggle } from "./themeToggle";
import { authClient } from "@/lib/auth-client";

const navItems = [
  { href: "/dashboard", label: "Dashboard", rolePermissions: ["user", "admin", ""] },
  { href: "/alarm", label: "Alarm System", rolePermissions: ["admin"] },
  { href: "/curtains", label: "Curtains", rolePermissions: ["user", "admin"] },
];

export function Header() {
  const { data: session, isPending } = authClient.useSession();

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/50 bg-gradient-to-b from-white to-white/95 backdrop-blur-xl shadow-sm dark:border-zinc-800/50 dark:from-zinc-950/95 dark:to-zinc-950/80">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex items-center gap-2 transition-all duration-300"
        >
          <div className="rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 p-2 shadow-md group-hover:shadow-lg group-hover:from-blue-500 group-hover:to-blue-600 transition-all duration-300">
            <span className="text-sm font-bold text-white">SH</span>
          </div>
          <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-700 dark:from-zinc-50 dark:to-zinc-300">
            SmartHome
          </span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-1 sm:flex">
          {navItems.map((item) => (
            (item.rolePermissions.includes(session?.user.role ?? "")) && (
              <Link
                key={item.href}
                href={item.href}
                className="group relative px-4 py-2 text-sm font-medium text-zinc-600 transition-colors duration-200 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                {item.label}
                <span className="absolute bottom-1 left-4 h-0.5 w-0 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 transition-all duration-300 group-hover:w-[calc(100%-2rem)] dark:from-blue-500 dark:to-blue-400" />
              </Link>
            )
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <UserHeaderComponent />
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}