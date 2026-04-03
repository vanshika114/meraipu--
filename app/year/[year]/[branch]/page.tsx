import { notFound } from "next/navigation";
import Link from "next/link";
import { BackButton } from "@/components/ui/BackButton";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { getValidYears, getSubjectsForBranchYear } from "@/lib/content";
import { BRANCHES } from "@/constants/branches";

interface PageProps {
  params: Promise<{ year: string; branch: string }>;
}

export async function generateStaticParams() {
  const params: { year: string; branch: string }[] = [];
  for (const year of getValidYears()) {
    for (const branch of Object.keys(BRANCHES)) {
      params.push({ year: String(year), branch });
    }
  }
  return params;
}

export default async function BranchPage({ params }: PageProps) {
  const { year, branch } = await params;
  const yearNum = parseInt(year, 10);

  if (!getValidYears().includes(yearNum) || !BRANCHES[branch]) notFound();

  const subjects = getSubjectsForBranchYear(yearNum, branch);

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <BackButton href={`/year/${year}`} />
      <Breadcrumb
        items={[
          { label: `Year ${year}`, href: `/year/${year}` },
          { label: BRANCHES[branch] },
        ]}
      />
      <h1 className="font-display text-3xl font-bold mb-2 text-foreground">
        {BRANCHES[branch]}
      </h1>
      <p className="text-muted-foreground mb-10">Year {year} — Select a subject</p>

      {subjects.length === 0 ? (
        <p className="text-muted-foreground">No subjects found yet. Coming soon!</p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {subjects.map((subject) => (
            <Link
              key={subject.slug}
              href={`/year/${year}/${branch}/${subject.slug}`}
              className="group rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
            >
              <p className="text-xs text-muted-foreground font-mono mb-1">
                {subject.code}
              </p>
              <h2 className="font-display text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                {subject.title}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {subject.credits} credits
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}