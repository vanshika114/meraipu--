"use client";

import { useState } from "react";
import type { Subject } from "@/lib/types";
import { TabNav, type SubjectTab } from "./TabNav";
import { SyllabusAccordion } from "./SyllabusAccordion";
import { PdfCard } from "./PdfCard";
import { YoutubeCard } from "./YoutubeCard";
import { FeatureCard } from "@/components/ui/grid-feature-cards";
import { motion, useReducedMotion } from "motion/react";
import { BookOpen, FileText, FlaskConical, Clock, Youtube } from "lucide-react";

interface SubjectDetailProps {
  subject: Subject;
}

type ViewAnimationProps = {
  delay?: number;
  className?: string;
  children: React.ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) return <>{children}</>;
  return (
    <motion.div
      initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
      whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const TAB_FEATURES = [
  { key: "syllabus",      title: "Syllabus",      icon: BookOpen,     description: "Unit-wise syllabus breakdown" },
  { key: "notes",         title: "Notes",         icon: FileText,     description: "Study notes & PDFs" },
  { key: "practical",     title: "Practical",     icon: FlaskConical, description: "Lab files & practicals" },
  { key: "pyqs",          title: "PYQs",          icon: Clock,        description: "Previous year questions" },
  { key: "endsemsaviour", title: "End Sem",        icon: Youtube,      description: "Last minute revision videos" },
];

export function SubjectDetail({ subject }: SubjectDetailProps) {
  const [activeTab, setActiveTab] = useState<SubjectTab>("syllabus");

  return (
    <div>
      {/* Header */}
      <AnimatedContainer>
        <h1 className="font-display text-2xl font-bold text-foreground mb-2">
          {subject.title}
        </h1>
        <p className="text-muted-foreground mb-6">{subject.code}</p>
      </AnimatedContainer>

      {/* Feature cards grid */}
      <AnimatedContainer delay={0.2}>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-x divide-y divide-dashed border border-dashed rounded-xl overflow-hidden mb-8">
          {TAB_FEATURES.map((f, i) => (
            <button
              key={f.key}
              onClick={() => setActiveTab(f.key as SubjectTab)}
              className={`text-left transition-colors duration-200 cursor-pointer ${
                activeTab === f.key
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-muted/50"
              }`}
            >
              <FeatureCard feature={f} />
            </button>
          ))}
        </div>
      </AnimatedContainer>

      {/* Tab content */}
      <AnimatedContainer delay={0.1} key={activeTab}>
        {activeTab === "syllabus" && (
          <SyllabusAccordion units={subject.units} />
        )}

        {activeTab === "notes" && (
          <div className="grid gap-4 sm:grid-cols-2">
            {(subject.notes ?? []).length === 0 ? (
              <p className="text-muted-foreground col-span-full">No notes added yet.</p>
            ) : (
              (subject.notes ?? []).map((file, i) => <PdfCard key={i} file={file} />)
            )}
          </div>
        )}

        {activeTab === "practical" && (
          <div className="grid gap-4 sm:grid-cols-2">
            {(subject.practicalFiles ?? []).length === 0 ? (
              <p className="text-muted-foreground col-span-full">No practical files added yet.</p>
            ) : (
              (subject.practicalFiles ?? []).map((file, i) => <PdfCard key={i} file={file} />)
            )}
          </div>
        )}

        {activeTab === "pyqs" && (
          <div className="grid gap-4 sm:grid-cols-2">
            {(subject.pyqs ?? []).length === 0 ? (
              <p className="text-muted-foreground col-span-full">No PYQs added yet.</p>
            ) : (
              (subject.pyqs ?? []).map((file, i) => <PdfCard key={i} file={file} />)
            )}
          </div>
        )}

        {activeTab === "endsemsaviour" && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(subject.endSemSaviour ?? []).length === 0 ? (
              <p className="text-muted-foreground col-span-full">No videos added yet.</p>
            ) : (
              (subject.endSemSaviour ?? []).map((video, i) => <YoutubeCard key={i} video={video} />)
            )}
          </div>
        )}
      </AnimatedContainer>
    </div>
  );
}