import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Subject } from "./types";
import { BRANCH_SLUGS } from "@/constants/branches";

const CONTENT_DIR = path.join(process.cwd(), "content");
const VALID_YEARS = [1, 2, 3, 4];

export function getValidYears(): number[] {
  return VALID_YEARS;
}

export function getAllYearParams(): { year: string }[] {
  return VALID_YEARS.map((y) => ({ year: String(y) }));
}

export function getBranches(): string[] {
  return BRANCH_SLUGS;
}

export function getAllBranchParams(year: number): { year: string; branch: string }[] {
  return BRANCH_SLUGS.map((branch) => ({ year: String(year), branch }));
}

export function getSubjectsForBranchYear(year: number, branch: string): Subject[] {
  const dir = path.join(CONTENT_DIR, `year${year}`, branch);
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
  return files.map((file) => {
    const raw = fs.readFileSync(path.join(dir, file), "utf-8");
    const { data } = matter(raw);
    const slug = file.replace(/\.mdx$/, "");
    return { ...data, slug, units: data.units ?? [] } as Subject;
  });
}

export function getSubjectBySlug(
  year: number,
  branch: string,
  slug: string
): Subject | null {
  const filePath = path.join(CONTENT_DIR, `year${year}`, branch, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data } = matter(raw);
  return { ...data, slug, units: data.units ?? [] } as Subject;
}

export function getAllSubjectParams(): {
  year: string;
  branch: string;
  subject: string;
}[] {
  const params: { year: string; branch: string; subject: string }[] = [];
  for (const year of VALID_YEARS) {
    for (const branch of BRANCH_SLUGS) {
      const subjects = getSubjectsForBranchYear(year, branch);
      for (const s of subjects) {
        params.push({ year: String(year), branch, subject: s.slug });
      }
    }
  }
  return params;
}