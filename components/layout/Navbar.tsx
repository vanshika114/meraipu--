"use client";

import Link from "next/link";
import { ThemeToggleButton } from "@/components/ui/ThemeToggleButton";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link
          href="/"
          className="font-display text-xl font-bold tracking-tight text-foreground hover:text-primary transition-colors"
        >
          meraipu
        </Link>
        <ThemeToggleButton />
      </div>
    </header>
  );
}
