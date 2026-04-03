import Link from "next/link";

const years = [
  { year: 1, label: "Year 1", href: "/year/1", desc: "1st & 2nd Semester" },
  { year: 2, label: "Year 2", href: "/year/2", desc: "3rd & 4th Semester" },
  { year: 3, label: "Year 3", href: "/year/3", desc: "5th & 6th Semester" },
  { year: 4, label: "Year 4", href: "/year/4", desc: "7th & 8th Semester", comingSoon: true },
];

export function YearCards() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {years.map(({ year, label, href, desc, comingSoon }) =>
        comingSoon ? (
          <div
            key={year}
            className="rounded-xl border border-border bg-card p-6 shadow-sm opacity-60"
          >
            <h2 className="font-display text-xl font-semibold text-foreground mb-1">
              {label}
            </h2>
            <p className="text-sm text-muted-foreground">{desc}</p>
            <p className="text-xs text-muted-foreground font-medium mt-2">Coming Soon</p>
          </div>
        ) : (
          <Link
            key={year}
            href={href!}
            className="group rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
          >
            <h2 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
              {label}
            </h2>
            <p className="text-sm text-muted-foreground">{desc}</p>
          </Link>
        )
      )}
    </div>
  );
}