import Link from "next/link";
import { BRANCHES } from "@/constants/branches";

interface BranchGridProps {
  sem: string;
}

export function BranchGrid({ sem }: BranchGridProps) {
  const slugs = Object.keys(BRANCHES);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {slugs.map((slug) => (
        <Link
          key={slug}
          href={`/semester/${sem}/${slug}`}
          className="group rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
        >
          <h2 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
            {BRANCHES[slug]}
          </h2>
          <p className="text-sm text-muted-foreground mt-1 uppercase tracking-wide">
            {slug}
          </p>
        </Link>
      ))}
    </div>
  );
}