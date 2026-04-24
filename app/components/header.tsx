import Link from "next/link";
import { Button } from "@heroui/react";

const navItems = [
  { href: "/", label: "Dashboard" },
  { href: "/rooms", label: "Rooms" },
  { href: "/devices", label: "Devices" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-black/65">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          SmartHome
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-2 sm:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Button className="rounded-full bg-zinc-900 px-4 py-2 font-medium text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900">
          Sign in
        </Button>
      </div>
    </header>
  );
}