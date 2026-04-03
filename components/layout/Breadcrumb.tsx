import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { BRANCHES } from "@/constants/branches";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="h-4 w-4 shrink-0" />}
            {item.href ? (
              <Link href={item.href} className="hover:text-primary transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function buildBreadcrumbForBranch(sem: string, branch: string): BreadcrumbItem[] {
  const branchName = BRANCHES[branch] ?? branch;
  return [
    { label: "Home", href: "/" },
    { label: `Semester ${sem}`, href: `/semester/${sem}` },
    { label: branchName },
  ];
}

export function buildBreadcrumbForSubject(
  sem: string,
  branch: string,
  subjectTitle: string
): BreadcrumbItem[] {
  const branchName = BRANCHES[branch] ?? branch;
  return [
    { label: "Home", href: "/" },
    { label: `Semester ${sem}`, href: `/semester/${sem}` },
    { label: branchName, href: `/semester/${sem}/${branch}` },
    { label: subjectTitle },
  ];
}