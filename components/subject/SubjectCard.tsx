import Link from "next/link";
import type { Subject } from "@/lib/types";
import BorderGlow from "@/components/ui/BorderGlow";

interface SubjectCardProps {
  subject: Subject;
  year: string;
  branch: string;
}

export function SubjectCard({ subject, year, branch }: SubjectCardProps) {
  return (
    <BorderGlow glowColor="#2aa7ea" borderRadius={12}>
      <Link
        href={`/year/${year}/${branch}/${subject.slug}`}
        className="group block rounded-xl border border-border bg-card px-5 py-5 transition-all duration-300 hover:bg-card/80"
      >
        <h2 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
          {subject.title}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">{subject.code}</p>
      </Link>
    </BorderGlow>
  );
}