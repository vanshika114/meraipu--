import { notFound } from "next/navigation";
import Link from "next/link";
import { BackButton } from "@/components/ui/BackButton";
import { getValidYears } from "@/lib/content";
import { BRANCHES } from "@/constants/branches";

interface PageProps {
  params: Promise<{ year: string }>;
}

export async function generateStaticParams() {
  return getValidYears().map((y) => ({ year: String(y) }));
}

export default async function YearPage({ params }: PageProps) {
  const { year } = await params;
  const yearNum = parseInt(year, 10);

  if (!getValidYears().includes(yearNum)) notFound();

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <BackButton href="/" />
      <h1 className="font-display text-3xl font-bold mb-2 text-foreground">
        Year {year}
      </h1>
      <p className="text-muted-foreground mb-10">Select your branch</p>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(BRANCHES).map(([slug, name]) => (
          <Link
            key={slug}
            href={`/year/${year}/${slug}`}
            className="group rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
          >
            <h2 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {name}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">View subjects</p>
          </Link>
        ))}
      </div>
    </div>
  );
}