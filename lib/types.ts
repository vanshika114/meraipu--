export interface SyllabusUnit {
  title: string;
  content: string;
}

export interface FileLink {
  title: string;
  url: string;
  type: string;
}

export interface VideoLink {
  title: string;
  url: string;
}

export interface SubjectFrontmatter {
  title: string;
  code: string;
  semester: number;
  branch: string;
  branchName: string;
  credits: number;
  units: SyllabusUnit[];
  notes?: FileLink[];
  practicalFiles?: FileLink[];
  pyqs?: FileLink[];
  endSemSaviour?: VideoLink[];
}

export interface Subject extends SubjectFrontmatter {
  slug: string;
}