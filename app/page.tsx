import { YearCards } from "@/components/home/YearCards";

export default function HomePage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <section className="text-center mb-16">
        <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
          Your IPU. Simplified.
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Syllabus, practical files, and previous year questions for Guru Gobind Singh Indraprastha University — all in one place.
        </p>
      </section>
      <YearCards />
    </div>
  );
}