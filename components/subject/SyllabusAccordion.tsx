"use client";

import { useState } from "react";
import { ChevronDown, BookOpen } from "lucide-react";
import type { SyllabusUnit } from "@/lib/types";

interface SyllabusAccordionProps {
  units: SyllabusUnit[];
}

const UNIT_COLORS = [
  "bg-blue-500/10 text-blue-500 border-blue-500/20",
  "bg-purple-500/10 text-purple-500 border-purple-500/20",
  "bg-green-500/10 text-green-500 border-green-500/20",
  "bg-orange-500/10 text-orange-500 border-orange-500/20",
  "bg-pink-500/10 text-pink-500 border-pink-500/20",
];

export function SyllabusAccordion({ units }: SyllabusAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="rounded-xl border border-border overflow-hidden divide-y divide-border">
      {units.map((unit, i) => {
        const isOpen = openIndex === i;
        const colorClass = UNIT_COLORS[i % UNIT_COLORS.length];
        const wordCount = unit.content?.split(" ").length ?? 0;
        const status = wordCount > 80 ? "Detailed" : wordCount > 40 ? "Moderate" : "Brief";
        const statusColor =
          status === "Detailed"
            ? "bg-green-500/10 text-green-600 dark:text-green-400"
            : status === "Moderate"
            ? "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
            : "bg-muted text-muted-foreground";

        return (
          <div key={i} className={`bg-card transition-colors duration-200 ${isOpen ? "bg-muted/30" : ""}`}>
            {/* Entity row — like EntityList.Item */}
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center gap-4 px-4 py-3.5 text-left hover:bg-muted/40 transition-colors"
            >
              {/* Icon thumbnail */}
              <div className={`shrink-0 rounded-lg border p-2 ${colorClass}`}>
                <BookOpen className="h-4 w-4" />
              </div>

              {/* Title + meta */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-medium text-foreground truncate">
                    {unit.title}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor}`}>
                    {status}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 truncate">
                  {unit.content?.slice(0, 80)}...
                </p>
              </div>

              {/* Unit number + chevron */}
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs text-muted-foreground hidden sm:block">
                  Unit {i + 1}
                </span>
                <ChevronDown
                  className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
            </button>

            {/* Expanded content */}
            <div
              className={`grid transition-[grid-template-rows] duration-200 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-4 pb-4 pt-1 ml-14">
                  <div className="rounded-lg bg-muted/50 border border-border p-4">
                    <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
                      {unit.content}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}