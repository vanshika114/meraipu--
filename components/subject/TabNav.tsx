"use client";

import { useRef, useEffect, useCallback } from "react";
import { BookOpen, FileText, FlaskConical, Clock, Youtube } from "lucide-react";

export type SubjectTab = "syllabus" | "notes" | "practical" | "pyqs" | "endsemsaviour";

const TABS: { id: SubjectTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "syllabus",      label: "Syllabus",         icon: BookOpen },
  { id: "notes",         label: "Notes",            icon: FileText },
  { id: "practical",     label: "Practical File",   icon: FlaskConical },
  { id: "pyqs",          label: "PYQs",             icon: Clock },
  { id: "endsemsaviour", label: "End Sem Saviour",  icon: Youtube },
];

interface TabNavProps {
  activeTab: SubjectTab;
  onTabChange: (tab: SubjectTab) => void;
  counts?: Partial<Record<SubjectTab, number>>;
}

export function TabNav({ activeTab, onTabChange, counts = {} }: TabNavProps) {
  const navRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);

  // Animate sliding indicator
  useEffect(() => {
    const activeBtn = activeRef.current;
    const indicator = indicatorRef.current;
    const nav = navRef.current;
    if (!activeBtn || !indicator || !nav) return;

    const navRect = nav.getBoundingClientRect();
    const btnRect = activeBtn.getBoundingClientRect();

    indicator.style.width = `${btnRect.width}px`;
    indicator.style.left = `${btnRect.left - navRect.left + nav.scrollLeft}px`;
  }, [activeTab]);

  // Scroll active tab into view on mobile
  useEffect(() => {
    activeRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [activeTab]);

  // Keyboard arrow navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const currentIndex = TABS.findIndex((t) => t.id === activeTab);
    if (e.key === "ArrowRight") {
      e.preventDefault();
      onTabChange(TABS[(currentIndex + 1) % TABS.length].id);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      onTabChange(TABS[(currentIndex - 1 + TABS.length) % TABS.length].id);
    }
  }, [activeTab, onTabChange]);

  return (
    <div className="relative border-b border-border">
      <div
        ref={navRef}
        className="flex gap-1 overflow-x-auto scrollbar-none scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <nav
          className="flex gap-1 min-w-max"
          aria-label="Subject tabs"
          onKeyDown={handleKeyDown}
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            const count = counts[tab.id];
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                ref={isActive ? activeRef : null}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onTabChange(tab.id)}
                className={`relative flex items-center gap-2 px-3 pb-3 pt-1 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm whitespace-nowrap ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-3.5 w-3.5 shrink-0" />
                {tab.label}
                {count !== undefined && count > 0 && (
                  <span
                    className={`inline-flex items-center justify-center rounded-full px-1.5 py-0.5 text-xs font-semibold leading-none transition-colors ${
                      isActive
                        ? "bg-primary/15 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Animated sliding underline */}
      <span
        ref={indicatorRef}
        className="absolute bottom-0 h-0.5 bg-primary rounded-full transition-all duration-300 ease-out pointer-events-none"
        aria-hidden
      />
    </div>
  );
}