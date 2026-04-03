import { notFound } from "next/navigation";
import { BackButton } from "@/components/ui/BackButton";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { SubjectDetail } from "@/components/subject/SubjectDetail";
import { getSubjectBySlug, getValidYears, getAllSubjectParams } from "@/lib/content";
import { BRANCHES } from "@/constants/branches";

interface PageProps {
  params: Promise<{ year: string; branch: string; subject: string }>;
}

export async function generateStaticParams() {
  return getAllSubjectParams();
}

export default async function SubjectDetailPage({ params }: PageProps) {
  const { year, branch, subject: subjectSlug } = await params;
  const yearNum = parseInt(year, 10);

  if (!getValidYears().includes(yearNum) || !BRANCHES[branch]) notFound();

  const subject = getSubjectBySlug(yearNum, branch, subjectSlug);
  if (!subject) notFound();

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <BackButton href={`/year/${year}/${branch}`} />
      <Breadcrumb
        items={[
          { label: `Year ${year}`, href: `/year/${year}` },
          { label: BRANCHES[branch], href: `/year/${year}/${branch}` },
          { label: subject.title },
        ]}
      />
      <SubjectDetail subject={subject} />
    </div>
  );
}